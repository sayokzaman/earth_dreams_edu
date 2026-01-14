import ConsultationForm from '@/components/consultation-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Props {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const CreateLeadDialog = ({ open, onOpenChange }: Props) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">Add New Lead</Button>
            </DialogTrigger>
            <DialogContent className="min-w-5xl">
                <DialogHeader>
                    <DialogTitle>Add New Lead</DialogTitle>
                    <DialogDescription />

                    <ConsultationForm isAdmin className="w-full" />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
