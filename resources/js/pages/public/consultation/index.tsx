import ConsultationForm from '@/components/consultation-form';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { Head } from '@inertiajs/react';

const ConsultationIndex = () => {
    return (
        <AppPublicLayout>
            <Head title="Consultation" />

            <ConsultationForm />
        </AppPublicLayout>
    );
};

export default ConsultationIndex;
