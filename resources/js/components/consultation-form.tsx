'use client';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Lead } from '@/types/lead';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const initialData = {
    first_name: '',
    last_name: '',
    email: '',
    mobile_country_code: '+44',
    mobile: '',
    is_whatsapp: false,
    country_of_residence: '',
    in_uk_now: 'no', // 'yes' | 'no'
    study_type: '',
    subject_interested: '',
    certify_truth: false,
};

type Props = {
    lead?: Lead;
    isAdmin?: boolean;
    className?: string;
};

export default function ConsultationForm({ lead, isAdmin = false, className }: Props) {
    const { data, setData, post, processing, reset, errors, clearErrors, setDefaults } = useForm(initialData);

    useEffect(() => {
        if (lead) {
            setData({
                first_name: lead.first_name || '',
                last_name: lead.last_name || '',
                email: lead.email || '',
                mobile_country_code: lead.mobile_country_code || '',
                mobile: lead.mobile || '',
                is_whatsapp: lead.is_whatsapp || false,
                country_of_residence: lead.country_of_residence || '',
                in_uk_now: lead.in_uk_now ? 'yes' : 'no',
                study_type: lead.study_type || '',
                subject_interested: lead.subject_interested || '',
                certify_truth: false,
            });
        }
    }, [lead, setData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearErrors();
        post('/consultation', {
            onSuccess: () => {
                reset();
                setDefaults(initialData);
                toast.success('Event has been created.', {
                    description: <p className="text-theme-foreground">Thanks for reaching out. We will get back to you soon.</p>,
                    duration: 5000,
                    position: 'top-center',
                    invert: true,
                });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className={cn('mx-auto max-w-5xl p-6', className)}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                {/* First Name */}
                <div className="grid gap-2">
                    <Label htmlFor="first_name">
                        First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        className={cn(isAdmin ? '' : 'rounded-2xl bg-white')}
                        id="first_name"
                        name="first_name"
                        placeholder="Enter the first name"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                    />
                    <InputError message={errors.first_name} />
                </div>

                {/* Last Name */}
                <div className="grid gap-2">
                    <Label htmlFor="last_name">
                        Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        className={cn(isAdmin ? '' : 'rounded-2xl bg-white')}
                        id="last_name"
                        name="last_name"
                        placeholder="Enter the last name"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                    />
                    <InputError message={errors.last_name} />
                </div>

                {/* Email */}
                <div className="grid gap-2">
                    <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        className={cn(isAdmin ? '' : 'rounded-2xl bg-white')}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>

                {/* Mobile + WhatsApp */}
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="mobile">
                            Mobile <span className="text-destructive">*</span>
                        </Label>

                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                            WhatsApp
                            <Checkbox
                                name="is_whatsapp"
                                checked={data.is_whatsapp}
                                onCheckedChange={(v) => setData('is_whatsapp', Boolean(v))}
                                className="bg-white"
                            />
                        </label>
                    </div>

                    <div className="flex gap-2">
                        {/* Country code */}
                        <Select
                            name="mobile_country_code"
                            value={data.mobile_country_code}
                            onValueChange={(val) => setData('mobile_country_code', val)}
                        >
                            <SelectTrigger className={cn('w-[92px]', isAdmin ? '' : 'rounded-2xl bg-white')}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className={cn(isAdmin ? '' : 'rounded-2xl bg-white')}>
                                <SelectItem value="+44">🇬🇧 +44</SelectItem>
                                <SelectItem value="+1">🇺🇸 +1</SelectItem>
                                <SelectItem value="+61">🇦🇺 +61</SelectItem>
                                <SelectItem value="+971">🇦🇪 +971</SelectItem>
                                <SelectItem value="+880">🇧🇩 +880</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Number */}
                        <Input
                            className={cn('flex-1', isAdmin ? '' : 'rounded-2xl bg-white')}
                            id="mobile"
                            name="mobile"
                            placeholder="Mobile number"
                            value={data.mobile}
                            onChange={(e) => setData('mobile', e.target.value)}
                        />
                    </div>

                    <InputError message={errors.mobile} />
                </div>

                {/* Country of Residence */}
                <div className="grid gap-2">
                    <Label>
                        Country Of Residence <span className="text-destructive">*</span>
                    </Label>
                    <Select
                        name="country_of_residence"
                        value={data.country_of_residence}
                        onValueChange={(val) => setData('country_of_residence', val)}
                    >
                        <SelectTrigger className={cn(isAdmin ? '' : 'rounded-2xl bg-white')}>
                            <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent className={cn(isAdmin ? '' : 'rounded-2xl bg-white', 'max-h-64')}>
                            <SelectItem value="bangladesh">Bangladesh</SelectItem>
                            <SelectItem value="india">India</SelectItem>
                            <SelectItem value="pakistan">Pakistan</SelectItem>
                            <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                            <SelectItem value="nepal">Nepal</SelectItem>
                            <SelectItem value="nigeria">Nigeria</SelectItem>
                            <SelectItem value="saudi">Saudi Arabia</SelectItem>
                            <SelectItem value="uae">United Arab Emirates</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.country_of_residence} />
                </div>

                {/* Are you in UK right now? */}
                <div className="grid gap-2">
                    <Label>
                        Are you in UK right now? <span className="text-destructive">*</span>
                    </Label>
                    <RadioGroup
                        name="in_uk_now"
                        className="flex items-center gap-6"
                        value={data.in_uk_now}
                        onValueChange={(val) => setData('in_uk_now', val)}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="inuk-yes" className={cn(isAdmin ? '' : 'bg-white')} />
                            <Label htmlFor="inuk-yes" className="font-normal">
                                Yes
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="inuk-no" className={cn(isAdmin ? '' : 'bg-white')} />
                            <Label htmlFor="inuk-no" className="font-normal">
                                No
                            </Label>
                        </div>
                    </RadioGroup>
                    <InputError message={errors.in_uk_now} />
                </div>

                {/* Type of Study */}
                <div className="grid gap-2">
                    <Label>
                        Type of Study <span className="text-destructive">*</span>
                    </Label>
                    <Select name="study_type" value={data.study_type} onValueChange={(val) => setData('study_type', val)}>
                        <SelectTrigger className={cn(isAdmin ? '' : 'rounded-2xl bg-white')}>
                            <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                        <SelectContent className={cn(isAdmin ? '' : 'rounded-2xl bg-white')}>
                            <SelectItem value="foundation">Foundation</SelectItem>
                            <SelectItem value="undergraduate">Undergraduate</SelectItem>
                            <SelectItem value="postgraduate">Postgraduate</SelectItem>
                            <SelectItem value="phd">PhD / Research</SelectItem>
                            <SelectItem value="pathway">Pre-sessional / Pathway</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.study_type} />
                </div>

                {/* Subject Interested */}
                <div className="grid gap-2">
                    <Label>
                        Subject Interested <span className="text-destructive">*</span>
                    </Label>
                    <Select name="subject_interested" value={data.subject_interested} onValueChange={(val) => setData('subject_interested', val)}>
                        <SelectTrigger className={cn(isAdmin ? '' : 'rounded-2xl bg-white')}>
                            <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                        <SelectContent className={cn(isAdmin ? '' : 'rounded-2xl bg-white', 'max-h-64')}>
                            <SelectItem value="business">Business &amp; Management</SelectItem>
                            <SelectItem value="cs">Computer Science / Data</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="law">Law</SelectItem>
                            <SelectItem value="medicine">Medicine &amp; Health</SelectItem>
                            <SelectItem value="arts">Arts / Design / Media</SelectItem>
                            <SelectItem value="other">Other / Not sure yet</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.subject_interested} />
                </div>
            </div>

            {/* Certification + Privacy */}
            <div className="mt-6 flex flex-col items-center space-y-6">
                <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <Checkbox
                        name="certify_truth"
                        checked={data.certify_truth}
                        onCheckedChange={(v) => setData('certify_truth', Boolean(v))}
                        className="bg-white"
                    />
                    <span>
                        {isAdmin ? (
                            <span>I certify that the information provided above is true and accurate.</span>
                        ) : (
                            <span>
                                I hereby certify that, to the best of my knowledge, the provided information is true and accurate. The documents
                                provided are genuine and the applicant named above is a genuine student and intends to fulfil their student visa in
                                its entirety.{' '}
                                <a href="#" className="text-red-600 underline underline-offset-2">
                                    Privacy Policy
                                </a>{' '}
                            </span>
                        )}
                        <span className="text-destructive">*</span>
                    </span>
                </label>
                <InputError message={errors.certify_truth} />

                <Button type="submit" disabled={processing} className={cn('w-full max-w-3xl disabled:opacity-70', isAdmin ? '' : 'rounded-full')}>
                    {processing ? 'Submitting…' : 'Submit'}
                </Button>
            </div>
        </form>
    );
}
