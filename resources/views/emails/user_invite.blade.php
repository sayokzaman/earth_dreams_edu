<x-mail::message>
# Hey {{ $user->name }}, you’ve been invited 🎉

You’ve been invited to join {{ config('app.name') }}.

Click the button below to accept your invite and access your account:

<x-mail::button :url="$inviteUrl">
Accept Your Invite
</x-mail::button>

If you weren’t expecting this, you can ignore this email.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
