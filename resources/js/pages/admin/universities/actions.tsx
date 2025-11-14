import { TextWithBreaks } from '@/components/text-with-breaks'
import { ContextMenuItem, ContextMenuLabel, ContextMenuSeparator } from '@/components/ui/context-menu';
import { University } from '@/types/university';
import { Link } from '@inertiajs/react';
import { MapPinIcon, SquarePenIcon, Trash2Icon } from 'lucide-react';

type Props = {
    university: University;
    setUniversityModal: (university: University) => void;
};

const UniversityActions = ({ university, setUniversityModal }: Props) => {
    return (
        <>
            <ContextMenuLabel>
                <div className="flex flex-col gap-1">
                    <TextWithBreaks text={university.name} />
                    <div className="flex gap-1 text-xs text-foreground/75">
                        <MapPinIcon className="size-4" /> {university.location}
                    </div>
                </div>
            </ContextMenuLabel>

            <ContextMenuSeparator />

            <ContextMenuItem>
                <Link href={route('admin.universities.show', university.id)} className="flex gap-2">
                    <SquarePenIcon className="size-5" /> <span>Edit university</span>
                </Link>
            </ContextMenuItem>

            <ContextMenuItem
                onClick={() => {
                    setUniversityModal(university);
                }}
            >
                <span className="flex gap-2 text-destructive">
                    <Trash2Icon className="size-5" /> <span>Delete</span>
                </span>
            </ContextMenuItem>
        </>
    );
};

export default UniversityActions;
