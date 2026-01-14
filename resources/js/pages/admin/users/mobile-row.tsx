import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types';
import { Mail, MoreVertical, Phone, SquarePenIcon, Trash2Icon } from 'lucide-react';

const UserMobileRow = ({
    user,
    setEditModalData,
    setDeleteModalData,
}: {
    user: User;
    setEditModalData: (user: User) => void;
    setDeleteModalData: (user: User) => void;
}) => {
    const getGradientColor = (role: string) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return 'from-red-500 to-pink-600';
            case 'counsellor':
                return 'from-blue-500 to-cyan-600';
            case 'staff':
                return 'from-purple-500 to-indigo-600';
            default:
                return 'from-gray-500 to-slate-600';
        }
    };

    return (
        <div className="group relative rounded-lg border bg-background shadow-sm">
            {/* Header Banner */}
            <div className="relative h-24 w-full bg-gradient-to-br from-rose-500/20 to-rose-500/5">
                <div className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

                {/* Avatar overlay */}
                <div className="absolute bottom-0 left-4 translate-y-1/2">
                    <Avatar className={`h-16 w-16 border-4 border-background ring-2 ring-background`}>
                        <AvatarImage src={user.avatar ? `/storage/${user.avatar}` : undefined} alt={user.name} />
                        <AvatarFallback className={`bg-gradient-to-br ${getGradientColor(user.roles?.[0]?.name)} text-sm font-bold text-white`}>
                            {user.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()
                                .slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                </div>

                {/* Actions Menu */}
                <div className="absolute top-3 right-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="size-8 rounded-full shadow-md">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[200px]">
                            <DropdownMenuLabel>
                                <div className="truncate">{user.name}</div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setEditModalData(user)} className="flex items-center gap-2">
                                <SquarePenIcon className="h-4 w-4" /> <span>Edit User</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDeleteModalData(user)} className="flex items-center gap-2 text-destructive">
                                <Trash2Icon className="h-4 w-4" /> <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="space-y-3 p-4 pt-10">
                {/* Name and Contact */}
                <div>
                    <div className="text-base font-bold">{user.name}</div>
                    <div className="mt-2 flex flex-col gap-1.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{user.email}</span>
                        </div>
                        {user.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3" />
                                <span>{user.phone}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Role and Status */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Role</p>
                        {user.roles
                            ? user.roles.map((role) => (
                                  <Badge key={role} variant="outline" className="mt-1 mr-1 capitalize">
                                      {role.name}
                                  </Badge>
                              ))
                            : null}
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Joined</p>
                        <Badge variant="secondary" className="mt-1">
                            {new Date(user.created_at).toLocaleDateString()}
                        </Badge>
                    </div>
                </div>

                <Separator />

                {/* Email Verified Status */}
                <div className="flex items-center gap-2 text-xs">
                    <div className={`h-2 w-2 rounded-full ${user.email_verified_at ? 'bg-emerald-500' : 'bg-muted-foreground'}`} />
                    <span className="text-muted-foreground">{user.email_verified_at ? 'Email verified' : 'Email pending'}</span>
                </div>
            </div>
        </div>
    );
};

export default UserMobileRow;
