import ConsultationForm from '@/components/consultation-form';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Lead } from '@/types/lead';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';

const LeadShow = ({ lead }: { lead: Lead }) => {
    return (
        <AppLayout>
            <Head title={lead.first_name + ' ' + lead.last_name} />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <h2 className="border-r pr-2 text-xl font-semibold">Lead #{lead.id}</h2>

                            <div className="flex flex-wrap gap-1">
                                <Badge className="font-semibold capitalize">{format(new Date(lead.created_at), 'h:mm a dd MMM yyyy')}</Badge>
                            </div>
                        </div>
                    </div>
                    {/* <Button type="submit" disabled={processing}>
                    {processing ? 'Updating...' : 'Update Lead'}
                </Button> */}
                </div>

                <ConsultationForm isAdmin lead={lead} className="w-full max-w-7xl p-0" />
            </div>
        </AppLayout>
    );
};

export default LeadShow;
