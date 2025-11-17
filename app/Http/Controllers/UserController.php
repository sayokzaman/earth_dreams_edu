<?php

namespace App\Http\Controllers;

use App\Mail\UserInviteMail;
use App\Models\Invitation;
use App\Models\User;
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

        $user = User::create($data);

        $user->syncRoles($data['roles']);

        $token = str()->random(64);

        $invitation = Invitation::create([
            'user_id'    => $user->id,
            'token'      => $token,
            'expires_at' => now()->addDays(7),
        ]);

        // Generate the invite URL
        $inviteUrl = route('invites.accept', $invitation->token);

        // Send email
        Mail::to($user->email)->send(
            new UserInviteMail($user, $inviteUrl)
        );

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }
}
