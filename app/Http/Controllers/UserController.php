<?php

namespace App\Http\Controllers;

use App\Mail\UserInviteMail;
use App\Models\Invitation;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $sortableColumns = ['id', 'name', 'email', 'phone', 'created_at'];

        $users = User::query()
            ->when($request->search, function ($q) use ($request) {
                $q->where(function ($query) use ($request) {
                    $query->where('name', 'like', "%{$request->search}%")
                        ->orWhere('email', 'like', "%{$request->search}%")
                        ->orWhere('phone', 'like', "%{$request->search}%");
                });
            })
            ->when($request->roles, function ($q) use ($request) {
                $roles = is_array($request->roles) ? $request->roles : [$request->roles];
                $q->whereHas('roles', function ($roleQuery) use ($roles) {
                    $roleQuery->whereIn('name', $roles);
                });
            })
            ->when($request->filled('joined_date'), function ($q) use ($request) {
                try {
                    $date = Carbon::parse($request->joined_date)->startOfDay();
                    $q->whereDate('created_at', $date);
                } catch (\Exception $e) {
                    // If the date format is invalid, skip applying the joined_date filter.
                }
            })
            ->when(
                $request->filled('sort_by'),
                function ($q) use ($request, $sortableColumns) {
                    $direction = $request->sort_to === 'desc' ? 'DESC' : 'ASC';

                    if (in_array($request->sort_by, $sortableColumns)) {
                        $q->orderBy($request->sort_by, $direction);
                    } else {
                        $q->orderBy('created_at', 'desc')->orderBy('id', 'desc');
                    }
                },
                fn ($q) => $q->orderBy('created_at', 'desc')->orderBy('id', 'desc')
            )
            ->with('roles');

        $users = $users->paginate($request->per_page ?? 20);

        return inertia('admin/users/index', [
            'users' => $users,
            'filters' => array_merge([
                'search' => '',
                'roles' => [],
                'joined_date' => '',
                'per_page' => 20,
            ], $request->only([
                'search',
                'roles',
                'joined_date',
                'per_page',
            ])),
        ]);
    }

    public function store()
    {
        $data = request()->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20',
            'roles' => 'required|array|min:1',
            'roles.*' => 'exists:roles,name',
        ]);

        // $password = bcrypt(str()->random(8));
        $password = bcrypt('password');
        $data['password'] = $password;

        DB::transaction(function () use ($data) {
            $user = User::create($data);

            $user->syncRoles($data['roles']);

            $token = str()->random(64);

            $invitation = Invitation::create([
                'user_id' => $user->id,
                'token' => $token,
                'expires_at' => now()->addDays(7),
            ]);

            $inviteUrl = route('invites.accept', $invitation->token);

            Mail::to($user->email)->send(
                new UserInviteMail($user, $inviteUrl)
            );
        });

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    public function update(User $user)
    {
        $data = request()->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'phone' => 'required|string|max:20',
            'roles' => 'required|array|min:1',
            'roles.*' => 'exists:roles,name',
        ]);

        DB::transaction(function () use ($user, $data) {
            $user->update($data);

            $user->syncRoles($data['roles']);
        });

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        if (Auth::user()->id === $user->id) {
            return redirect()->route('admin.users.index')->with('error', 'You cannot delete your own account.');
        }

        if (Auth::user()->hasRole('admin') && ($user->hasRole('super-admin') || $user->hasRole('admin'))) {
            return redirect()->route('admin.users.index')->with('error', 'You do not have permission to delete this user.');
        }

        if ($user->hasRole('super-admin')) {
            $superAdminCount = User::role('super-admin')->count();
            if ($superAdminCount <= 1) {
                return redirect()->route('admin.users.index')->with('error', 'At least one super-admin must remain.');
            }
        }

        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }
}
