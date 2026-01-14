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
import { Lead } from '@/types/lead';
import { Mail, MessageSquare, MoreVertical, Phone } from 'lucide-react';

const LeadMobileRow = ({ lead }: { lead: Lead }) => {
    return (
        <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm">
            {/* Header Banner */}
            <div className="relative h-24 w-full bg-gradient-to-br from-orange-500/20 to-orange-500/5">
                <div className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

                {/* Icon overlay */}
                <div className="absolute bottom-0 left-4 z-10 translate-y-1/2">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border-2 border-background bg-background shadow-md">
                        <MessageSquare className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    </div>
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
                                <div className="truncate">{lead.first_name + ' ' + lead.last_name}</div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <a href={`mailto:${lead.email}`} className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" /> <span>Send Email</span>
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href={`tel:${lead.mobile}`} className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" /> <span>Call</span>
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="space-y-3 p-4 pt-10">
                {/* Name and Contact */}
                <div>
                    <div className="text-base font-bold">{lead.first_name + ' ' + lead.last_name}</div>
                    <div className="mt-2 flex flex-col gap-1.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            <span>{lead.mobile}</span>
                        </div>
                    </div>
                </div>

                {/* Study Type and Country */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Study Type</p>
                        <Badge variant="outline" className="mt-1 capitalize">
                            {lead.study_type}
                        </Badge>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Country</p>
                        <Badge variant="secondary" className="mt-1 capitalize">
                            {lead.country_of_residence}
                        </Badge>
                    </div>
                </div>

                <Separator />

                {/* Subject and Received Date */}
                <div className="space-y-2">
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Interested in</p>
                        <div className="mt-1 text-sm font-medium">{lead.subject_interested}</div>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Received</p>
                        <div className="text-xs text-muted-foreground">{new Date(lead.created_at).toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadMobileRow;
