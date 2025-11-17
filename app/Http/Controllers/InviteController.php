<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class InviteController extends Controller
{
    public function accept(string $token)
    {
        $invitation = Invitation::where('token', $token)
            ->whereNull('used_at')
            ->where('expires_at', '>', now())
            ->firstOrFail();

        $user = $invitation->user;

        DB::transaction(function () use ($invitation) {
            $invitation->update([
                'used_at' => now(),
            ]);
        });

        Auth::login($user);

        return redirect()->route('dashboard');
    }

    public function setPassword()
    {
        $data = request()->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = request()->user();

        $user->password = Hash::make($data['password']);
        $user->set_password = true;
        $user->email_verified_at = now();
        $user->save();

        return redirect()->route('dashboard')->with('success', 'Password set successfully.');
    }
}
