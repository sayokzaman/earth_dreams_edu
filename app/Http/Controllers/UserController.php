<?php

namespace App\Http\Controllers;

use App\Mail\UserInviteMail;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->paginate(20);

        return inertia('admin/users/index', [
            'users' => $users,
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
