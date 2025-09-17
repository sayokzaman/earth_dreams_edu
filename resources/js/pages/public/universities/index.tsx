import { Card, CardHeader } from '@/components/ui/card';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { universityList } from '@/pages/public/universities/university-list';
import { Head, Link } from '@inertiajs/react';

const UniversityIndex = () => {
    return (
        <AppPublicLayout>
            <Head title="Universities" />

            <Wrapper className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-3">
                {universityList.map((university) => (
                    <Link href={route('public.universities.show', university.link)}>
                        <Card>
                            <CardHeader className='flex items-center justify-center'>
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
