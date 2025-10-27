import { Card, CardHeader } from '@/components/ui/card';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { University } from '@/types/university';
import { Head, Link } from '@inertiajs/react';

type Props = {
    universities: University[];
};

const UniversityIndex = ({ universities }: Props) => {
    return (
        <AppPublicLayout>
            <Head title="Universities" />

            <Wrapper className="grid grid-cols-1 gap-6 pt-26 md:grid-cols-3">
                {universities.map((university) => (
                    <Link href={route('public.universities.show', university.name)} key={university.id}>
                        <Card>
                            <CardHeader className="flex items-center justify-center">
                                <img src={university.logo} alt="" className="h-12 w-fit" />
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </Wrapper>
        </AppPublicLayout>
    );
};

export default UniversityIndex;
