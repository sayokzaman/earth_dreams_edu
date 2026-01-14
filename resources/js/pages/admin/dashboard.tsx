import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    Calendar,
    Clock,
    FileUserIcon,
    GraduationCapIcon,
    LandmarkIcon,
    MapPin,
    NotebookPen,
    Plus,
    Sparkles,
    TrendingUp,
    Users2Icon,
    Zap,
} from 'lucide-react';
import { useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardStats {
    universities: { total: number; new_this_week: number; new_this_month: number };
    courses: { total: number; new_this_week: number; new_this_month: number };
    blogs: { total: number; new_this_week: number; new_this_month: number; by_type: Record<string, number> };
    leads: { total: number; new_this_week: number; new_this_month: number; by_study_type: Record<string, number> };
    users: { total: number; new_this_week: number; new_this_month: number };
}

interface MonthlyData {
    month: string;
    universities: number;
    courses: number;
    blogs: number;
    leads: number;
    users: number;
}

interface Props {
    stats: DashboardStats;
    recentUniversities: Array<{ id: number; name: string; location: string; created_at: string }>;
    recentCourses: Array<{ id: number; title: string; study_level: string; created_at: string; faculty: { name: string } }>;
    recentBlogs: Array<{
        id: number;
        title: string;
        type: string;
        created_at: string;
        author: { name: string };
        category: { name: string };
    }>;
    recentLeads: Array<{ id: number; first_name: string; last_name: string; email: string; study_type: string; created_at: string }>;
    recentUsers: Array<{ id: number; name: string; email: string; created_at: string; roles: Array<{ name: string }> }>;
    monthlyData: MonthlyData[];
}

export default function Dashboard({ stats, recentUniversities, recentCourses, recentBlogs, recentLeads, recentUsers, monthlyData }: Props) {
    const { auth } = usePage<SharedData>().props;

    const isAdminOrSuperAdmin = auth.user.roles?.some((role) => ['super-admin', 'admin'].includes(role.name));

    const statCards = useMemo(() => {
        const cards = [
            {
                title: 'Universities',
                value: stats.universities.total,
                change: stats.universities.new_this_month,
                trend: stats.universities.new_this_month > 0 ? 'up' : 'neutral',
                icon: LandmarkIcon,
                gradient: 'from-blue-500 to-cyan-500',
                textColor: 'text-blue-600 dark:text-blue-400',
                bgColor: 'bg-blue-50 dark:bg-blue-950/50',
                href: '/universities',
            },
            {
                title: 'Courses',
                value: stats.courses.total,
                change: stats.courses.new_this_month,
                trend: stats.courses.new_this_month > 0 ? 'up' : 'neutral',
                icon: GraduationCapIcon,
                gradient: 'from-purple-500 to-pink-500',
                textColor: 'text-purple-600 dark:text-purple-400',
                bgColor: 'bg-purple-50 dark:bg-purple-950/50',
                href: '/courses',
            },
            {
                title: 'Blogs & News',
                value: stats.blogs.total,
                change: stats.blogs.new_this_month,
                trend: stats.blogs.new_this_month > 0 ? 'up' : 'neutral',
                icon: NotebookPen,
                gradient: 'from-emerald-500 to-teal-500',
                textColor: 'text-emerald-600 dark:text-emerald-400',
                bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
                href: '/blogs',
            },
            {
                title: 'Leads',
                value: stats.leads.total,
                change: stats.leads.new_this_month,
                trend: stats.leads.new_this_month > 0 ? 'up' : 'neutral',
                icon: FileUserIcon,
                gradient: 'from-orange-500 to-amber-500',
                textColor: 'text-orange-600 dark:text-orange-400',
                bgColor: 'bg-orange-50 dark:bg-orange-950/50',
                href: '/leads',
            },
        ];

        if (isAdminOrSuperAdmin) {
            cards.push({
                title: 'Users',
                value: stats.users.total,
                change: stats.users.new_this_month,
                trend: stats.users.new_this_month > 0 ? 'up' : 'neutral',
                icon: Users2Icon,
                gradient: 'from-rose-500 to-pink-500',
                textColor: 'text-rose-600 dark:text-rose-400',
                bgColor: 'bg-rose-50 dark:bg-rose-950/50',
                href: '/users',
            });
        }

        return cards;
    }, [stats, isAdminOrSuperAdmin]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Section */}
                <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8">
                    <div className="bg-grid-white/10 absolute inset-0 [mask-image:radial-gradient(white,transparent_85%)]" />
                    <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium text-primary">Welcome back</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                                Hello, <span className="text-primary">{auth.user.name}</span>! 👋
                            </h1>
                            <p className="text-muted-foreground">Here's your platform overview and latest activity</p>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Button asChild size="lg" className="gap-2">
                                <Link href={`/leads?date=${new Date().toISOString().split('T')[0]}`}>
                                    <FileUserIcon className="h-4 w-4" />
                                    Today's Leads
                                </Link>
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="lg" variant="outline" className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Quick Add
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>Quick Add</DialogTitle>
                                        <DialogDescription>Choose what you'd like to create</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-3 py-4">
                                        <Button asChild variant="outline" className="h-16 justify-start gap-4" size="lg">
                                            <Link href="/universities/create">
                                                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-950">
                                                    <LandmarkIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-semibold">Add University</div>
                                                    <div className="text-xs text-muted-foreground">Create a new university profile</div>
                                                </div>
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" className="h-16 justify-start gap-4" size="lg">
                                            <Link href="/courses/create">
                                                <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-950">
                                                    <GraduationCapIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-semibold">Add Course</div>
                                                    <div className="text-xs text-muted-foreground">Create a new course listing</div>
                                                </div>
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" className="h-16 justify-start gap-4" size="lg">
                                            <Link href="/blogs/create">
                                                <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-950">
                                                    <NotebookPen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-semibold">Create Blog</div>
                                                    <div className="text-xs text-muted-foreground">Write a new blog post or article</div>
                                                </div>
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" className="h-16 justify-start gap-4" size="lg">
                                            <Link href="/leads?create=true">
                                                <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-950">
                                                    <FileUserIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-semibold">Add Lead</div>
                                                    <div className="text-xs text-muted-foreground">Register a new student inquiry</div>
                                                </div>
                                            </Link>
                                        </Button>
                                        {auth.user.roles?.some((role) => ['super-admin', 'admin'].includes(role.name)) && (
                                            <Button asChild variant="outline" className="h-16 justify-start gap-4" size="lg">
                                                <Link href="/users?create=true">
                                                    <div className="rounded-lg bg-rose-100 p-2 dark:bg-rose-950">
                                                        <Users2Icon className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="font-semibold">Add User</div>
                                                        <div className="text-xs text-muted-foreground">Create a new user account</div>
                                                    </div>
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className={cn('grid gap-4 md:grid-cols-2', isAdminOrSuperAdmin ? 'lg:grid-cols-5' : 'lg:grid-cols-4')}>
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Link key={index} href={stat.href} className="group">
                                <Card className="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <div
                                        className={cn(
                                            'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-5',
                                            stat.gradient,
                                        )}
                                    />
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                                        <div className={cn('rounded-xl p-2.5 transition-colors', stat.bgColor)}>
                                            <Icon className={cn('h-5 w-5', stat.textColor)} />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-1">
                                        <div className="flex items-baseline justify-between">
                                            <div className="text-3xl font-bold tracking-tight">{stat.value.toLocaleString()}</div>
                                            {stat.trend === 'up' && stat.change > 0 && (
                                                <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                                    <TrendingUp className="h-3 w-3" />
                                                    <span>+{stat.change}</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {stat.change > 0 ? `+${stat.change} this month` : 'No new this month'}
                                        </p>
                                    </CardContent>
                                    <div
                                        className={cn(
                                            'absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                                            stat.gradient,
                                        )}
                                    />
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* Charts Section */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Monthly Trends */}
                    <Card className="overflow-hidden py-0">
                        <CardHeader className="border-b bg-gradient-to-br from-primary/5 to-transparent px-6 py-4">
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <BarChart3 className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Growth Trends</CardTitle>
                                    <CardDescription>Content creation over the last 6 months</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <div className="space-y-5">
                                {monthlyData.map((data, idx) => {
                                    const total = data.universities + data.courses + data.blogs + data.leads;
                                    const maxTotal = Math.max(...monthlyData.map((d) => d.universities + d.courses + d.blogs + d.leads));
                                    const percentage = maxTotal > 0 ? (total / maxTotal) * 100 : 0;
                                    const isCurrentMonth = idx === 0;

                                    return (
                                        <div key={idx} className="group space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    {isCurrentMonth && (
                                                        <div className="flex h-2 w-2">
                                                            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary opacity-75"></span>
                                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                                                        </div>
                                                    )}
                                                    <span className={cn('font-medium', isCurrentMonth && 'text-primary')}>{data.month}</span>
                                                </div>
                                                <span className="text-muted-foreground">
                                                    <span className="font-semibold text-foreground">{total}</span> items
                                                </span>
                                            </div>
                                            <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card className="overflow-hidden py-0">
                        <CardHeader className="border-b bg-gradient-to-br from-primary/5 to-transparent px-6 py-4">
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <Zap className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Weekly Insights</CardTitle>
                                    <CardDescription>Activity summary for this week</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <div className="grid gap-4">
                                <Link href="/universities">
                                    <div className="group flex items-center justify-between rounded-xl border bg-gradient-to-br from-blue-50/50 to-transparent p-4 transition-all hover:shadow-md dark:from-blue-950/20">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-blue-100 p-2.5 dark:bg-blue-950">
                                                <LandmarkIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">New Universities</p>
                                                <p className="text-xs text-muted-foreground">Last 7 days</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-3xl font-bold">{stats.universities.new_this_week}</div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                        </div>
                                    </div>
                                </Link>

                                <Link href="/courses">
                                    <div className="group flex items-center justify-between rounded-xl border bg-gradient-to-br from-purple-50/50 to-transparent p-4 transition-all hover:shadow-md dark:from-purple-950/20">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-purple-100 p-2.5 dark:bg-purple-950">
                                                <GraduationCapIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">New Courses</p>
                                                <p className="text-xs text-muted-foreground">Last 7 days</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-3xl font-bold">{stats.courses.new_this_week}</div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                        </div>
                                    </div>
                                </Link>

                                <Link href="/leads">
                                    <div className="group flex items-center justify-between rounded-xl border bg-gradient-to-br from-orange-50/50 to-transparent p-4 transition-all hover:shadow-md dark:from-orange-950/20">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-orange-100 p-2.5 dark:bg-orange-950">
                                                <FileUserIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">New Leads</p>
                                                <p className="text-xs text-muted-foreground">Last 7 days</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-3xl font-bold">{stats.leads.new_this_week}</div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                        </div>
                                    </div>
                                </Link>

                                <Link href="/blogs">
                                    <div className="group flex items-center justify-between rounded-xl border bg-gradient-to-br from-emerald-50/50 to-transparent p-4 transition-all hover:shadow-md dark:from-emerald-950/20">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-emerald-100 p-2.5 dark:bg-emerald-950">
                                                <NotebookPen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">New Content</p>
                                                <p className="text-xs text-muted-foreground">Last 7 days</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-3xl font-bold">{stats.blogs.new_this_week}</div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity Tabs */}
                <Card className="overflow-hidden py-0">
                    <CardHeader className="border-b bg-gradient-to-br from-primary/5 to-transparent px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Latest updates across all modules</CardDescription>
                                </div>
                            </div>
                            <Badge variant="secondary" className="gap-1">
                                <Calendar className="h-3 w-3" />
                                Live
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                        <Tabs defaultValue="leads" className="w-full">
                            <TabsList className={cn('grid w-full bg-muted/50', isAdminOrSuperAdmin ? 'grid-cols-5' : 'grid-cols-4')}>
                                <TabsTrigger value="leads" className="gap-1 data-[state=active]:bg-orange-100 dark:data-[state=active]:bg-orange-950">
                                    <FileUserIcon className="h-3 w-3" />
                                    <span className="hidden sm:inline">Leads</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="universities"
                                    className="gap-1 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-950"
                                >
                                    <LandmarkIcon className="h-3 w-3" />
                                    <span className="hidden sm:inline">Universities</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="courses"
                                    className="gap-1 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-950"
                                >
                                    <GraduationCapIcon className="h-3 w-3" />
                                    <span className="hidden sm:inline">Courses</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="blogs"
                                    className="gap-1 data-[state=active]:bg-emerald-100 dark:data-[state=active]:bg-emerald-950"
                                >
                                    <NotebookPen className="h-3 w-3" />
                                    <span className="hidden sm:inline">Blogs</span>
                                </TabsTrigger>
                                {isAdminOrSuperAdmin && (
                                    <TabsTrigger value="users" className="gap-1 data-[state=active]:bg-rose-100 dark:data-[state=active]:bg-rose-950">
                                        <Users2Icon className="h-3 w-3" />
                                        <span className="hidden sm:inline">Users</span>
                                    </TabsTrigger>
                                )}
                            </TabsList>

                            <TabsContent value="leads">
                                <div>
                                    {recentLeads.map((lead, idx) => (
                                        <div key={lead.id}>
                                            <Link href={`/leads/${lead.id}`}>
                                                <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent">
                                                    <div className="space-y-1">
                                                        <p className="font-medium">
                                                            {lead.first_name} {lead.last_name}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <span>{lead.email}</span>
                                                            <span>•</span>
                                                            <Badge variant="outline" className="capitalize">
                                                                {lead.study_type}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs text-muted-foreground">{formatDateTime(lead.created_at)}</span>
                                                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            </Link>
                                            {idx < recentLeads.length - 1 && <Separator className="my-1" />}
                                        </div>
                                    ))}
                                </div>
                                {recentLeads.length === 0 && <div className="py-8 text-center text-sm text-muted-foreground">No recent leads</div>}
                            </TabsContent>

                            <TabsContent value="universities">
                                <div>
                                    {recentUniversities.map((university, idx) => (
                                        <div key={university.id}>
                                            <Link href={`/universities/${university.id}`}>
                                                <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent">
                                                    <div className="space-y-1">
                                                        <p className="font-medium">{university.name}</p>
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="inline-block h-4 w-4 text-muted-foreground" />
                                                            <p className="text-sm text-muted-foreground">{university.location}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs text-muted-foreground">{formatDate(university.created_at)}</span>
                                                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            </Link>
                                            {idx < recentUniversities.length - 1 && <Separator className="my-1" />}
                                        </div>
                                    ))}
                                </div>
                                {recentUniversities.length === 0 && (
                                    <div className="py-8 text-center text-sm text-muted-foreground">No recent universities</div>
                                )}
                            </TabsContent>

                            <TabsContent value="courses">
                                <div>
                                    {recentCourses.map((course, idx) => (
                                        <div key={course.id}>
                                            <Link href={`/courses/${course.id}`}>
                                                <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent">
                                                    <div className="space-y-1">
                                                        <p className="font-medium">{course.title}</p>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <span>{course.faculty.name}</span>
                                                            <span>•</span>
                                                            <Badge variant="outline" className="capitalize">
                                                                {course.study_level}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs text-muted-foreground">{formatDate(course.created_at)}</span>
                                                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            </Link>
                                            {idx < recentCourses.length - 1 && <Separator className="my-1" />}
                                        </div>
                                    ))}
                                </div>
                                {recentCourses.length === 0 && (
                                    <div className="py-8 text-center text-sm text-muted-foreground">No recent courses</div>
                                )}
                            </TabsContent>

                            <TabsContent value="blogs">
                                <div>
                                    {recentBlogs.map((blog, idx) => (
                                        <div key={blog.id}>
                                            <Link href={`/blogs/${blog.id}`}>
                                                <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent">
                                                    <div className="space-y-1">
                                                        <p className="font-medium">{blog.title}</p>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <span>{blog.author.name}</span>
                                                            <span>•</span>
                                                            <Badge variant="outline" className="capitalize">
                                                                {blog.type}
                                                            </Badge>
                                                            <span>•</span>
                                                            <span className="capitalize">{blog.category ? blog.category.name : 'Uncategorized'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs text-muted-foreground">{formatDate(blog.created_at)}</span>
                                                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            </Link>
                                            {idx < recentBlogs.length - 1 && <Separator className="my-1" />}
                                        </div>
                                    ))}
                                </div>
                                {recentBlogs.length === 0 && <div className="py-8 text-center text-sm text-muted-foreground">No recent blogs</div>}
                            </TabsContent>

                            {isAdminOrSuperAdmin && (
                                <TabsContent value="users">
                                    <div>
                                        {recentUsers.map((user, idx) => (
                                            <div key={user.id}>
                                                <Link href={`/users/${user.id}`}>
                                                    <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent">
                                                        <div className="space-y-1">
                                                            <p className="font-medium">{user.name}</p>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <span>{user.email}</span>
                                                                {user.roles && user.roles.length > 0 && (
                                                                    <>
                                                                        <span>•</span>
                                                                        <Badge variant="outline" className="capitalize">
                                                                            {user.roles[0].name}
                                                                        </Badge>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-xs text-muted-foreground">{formatDate(user.created_at)}</span>
                                                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                    </div>
                                                </Link>
                                                {idx < recentUsers.length - 1 && <Separator className="my-1" />}
                                            </div>
                                        ))}
                                    </div>
                                    {recentUsers.length === 0 && (
                                        <div className="py-8 text-center text-sm text-muted-foreground">No recent users</div>
                                    )}
                                </TabsContent>
                            )}
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="overflow-hidden py-0">
                    <CardHeader className="border-b bg-gradient-to-br from-primary/5 to-transparent py-4">
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Zap className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>Common tasks and shortcuts to boost productivity</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                        <div className={cn('grid gap-3 md:grid-cols-3', isAdminOrSuperAdmin ? 'lg:grid-cols-5' : 'lg:grid-cols-4')}>
                            <Link href="/universities/create">
                                <Card className="group cursor-pointer overflow-hidden border-2 transition-all hover:border-blue-500 hover:shadow-md">
                                    <CardContent className="flex h-28 flex-col items-center justify-center gap-3 p-4">
                                        <div className="rounded-xl bg-blue-100 p-3 transition-transform group-hover:scale-110 dark:bg-blue-950">
                                            <LandmarkIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <span className="text-sm font-medium">Add University</span>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link href="/courses/create">
                                <Card className="group cursor-pointer overflow-hidden border-2 transition-all hover:border-purple-500 hover:shadow-md">
                                    <CardContent className="flex h-28 flex-col items-center justify-center gap-3 p-4">
                                        <div className="rounded-xl bg-purple-100 p-3 transition-transform group-hover:scale-110 dark:bg-purple-950">
                                            <GraduationCapIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <span className="text-sm font-medium">Add Course</span>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link href="/blogs/create">
                                <Card className="group cursor-pointer overflow-hidden border-2 transition-all hover:border-emerald-500 hover:shadow-md">
                                    <CardContent className="flex h-28 flex-col items-center justify-center gap-3 p-4">
                                        <div className="rounded-xl bg-emerald-100 p-3 transition-transform group-hover:scale-110 dark:bg-emerald-950">
                                            <NotebookPen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <span className="text-sm font-medium">Create Blog</span>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link href="/leads">
                                <Card className="group cursor-pointer overflow-hidden border-2 transition-all hover:border-orange-500 hover:shadow-md">
                                    <CardContent className="flex h-28 flex-col items-center justify-center gap-3 p-4">
                                        <div className="rounded-xl bg-orange-100 p-3 transition-transform group-hover:scale-110 dark:bg-orange-950">
                                            <FileUserIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <span className="text-sm font-medium">View Leads</span>
                                    </CardContent>
                                </Card>
                            </Link>
                            {isAdminOrSuperAdmin && (
                                <Link href="/users">
                                    <Card className="group cursor-pointer overflow-hidden border-2 transition-all hover:border-rose-500 hover:shadow-md">
                                        <CardContent className="flex h-28 flex-col items-center justify-center gap-3 p-4">
                                            <div className="rounded-xl bg-rose-100 p-3 transition-transform group-hover:scale-110 dark:bg-rose-950">
                                                <Users2Icon className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                                            </div>
                                            <span className="text-sm font-medium">Manage Users</span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
