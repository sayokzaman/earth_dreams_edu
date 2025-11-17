<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserInviteMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public string $inviteUrl
    ) {}

    public function build()
    {
        return $this
            ->subject('You’ve been invited to our platform')
            ->markdown('emails.user_invite', [
                'user'      => $this->user,
                'inviteUrl' => $this->inviteUrl,
            ]);
    }
}
