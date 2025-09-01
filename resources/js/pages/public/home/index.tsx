import { Button } from '@/components/ui/button';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { Head } from '@inertiajs/react';

export default function PublicHome() {
    return (
        <AppPublicLayout>
            <Head title="Earth Dreams Edu" />

            <div className="-scale-x-100 bg-[url('/images/edec_hero.jpg')] bg-cover bg-center">
                <div className="flex min-h-screen -scale-x-100 flex-col justify-end gap-4 bg-linear-to-t from-white/50 pb-40 pl-6 text-white sm:justify-center sm:bg-linear-to-r sm:from-white/20 sm:pb-0 sm:pl-24">
                    <div className="flex flex-col gap-4 sm:w-1/2">
                        <span className="h-full text-3xl sm:text-6xl">
                            <span className="text-theme-accent">Lorem</span> ipsum <span className="text-theme-secondary">dolor</span> sit amet
                            consectetur.
                        </span>
                        <p className="sm:text-2xl">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo libero, eum eligendi placeat nisi at id ut ex incidunt
                            reprehenderit.
                        </p>

                        <div className="mt-4 flex gap-2">
                            <Button className="h-10 bg-theme-accent px-4 py-2">Lorem ipsum</Button>
                            <Button className="h-10 bg-theme-secondary px-4 py-2">Lorem ipsum</Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppPublicLayout>
    );
}
