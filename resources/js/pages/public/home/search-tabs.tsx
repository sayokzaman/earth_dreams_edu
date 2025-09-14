import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

export function SearchTabs({ className }: { className?: string }) {
    return (
        <div className={cn('mx-auto w-full rounded-2xl', className)}>
            <Tabs defaultValue="location">
                {/* Tabs header */}
                <TabsList className="mb-4 grid h-auto w-full grid-cols-2 gap-3 rounded-lg bg-transparent sm:mb-6 sm:grid-cols-4 sm:gap-0">
                    <TabsTrigger
                        value="location"
                        className="h-10 rounded-3xl border text-sm text-gray-200 sm:rounded-none sm:border-0 sm:border-b-2 sm:border-transparent sm:text-base sm:data-[state=active]:rounded-t-xl sm:data-[state=active]:border-b-2 sm:data-[state=active]:border-white sm:data-[state=active]:bg-transparent data-[state=active]:bg-muted sm:data-[state=active]:font-bold sm:data-[state=active]:text-gray-200 sm:data-[state=active]:shadow-none data-[state=active]:backdrop-blur sm:data-[state=active]:backdrop-blur-none"
                    >
                        Location
                    </TabsTrigger>
                    <TabsTrigger
                        value="university"
                        className="h-10 rounded-3xl border text-sm text-gray-200 sm:rounded-none sm:border-0 sm:border-b-2 sm:border-transparent sm:text-base sm:data-[state=active]:rounded-t-xl sm:data-[state=active]:border-b-2 sm:data-[state=active]:border-white sm:data-[state=active]:bg-transparent data-[state=active]:bg-muted sm:data-[state=active]:font-bold sm:data-[state=active]:text-gray-200 sm:data-[state=active]:shadow-none data-[state=active]:backdrop-blur sm:data-[state=active]:backdrop-blur-none"
                    >
                        University
                    </TabsTrigger>
                    <TabsTrigger
                        value="courses"
                        className="h-10 rounded-3xl border text-sm text-gray-200 sm:rounded-none sm:border-0 sm:border-b-2 sm:border-transparent sm:text-base sm:data-[state=active]:rounded-t-xl sm:data-[state=active]:border-b-2 sm:data-[state=active]:border-white sm:data-[state=active]:bg-transparent data-[state=active]:bg-muted sm:data-[state=active]:font-bold sm:data-[state=active]:text-gray-200 sm:data-[state=active]:shadow-none data-[state=active]:backdrop-blur sm:data-[state=active]:backdrop-blur-none"
                    >
                        Courses
                    </TabsTrigger>
                    <TabsTrigger
                        value="events"
                        className="h-10 rounded-3xl border text-sm text-gray-200 sm:rounded-none sm:border-0 sm:border-b-2 sm:border-transparent sm:text-base sm:data-[state=active]:rounded-t-xl sm:data-[state=active]:border-b-2 sm:data-[state=active]:border-white sm:data-[state=active]:bg-transparent data-[state=active]:bg-muted sm:data-[state=active]:font-bold sm:data-[state=active]:text-gray-200 sm:data-[state=active]:shadow-none data-[state=active]:backdrop-blur sm:data-[state=active]:backdrop-blur-none"
                    >
                        Events
                    </TabsTrigger>
                </TabsList>

                {/* Location tab */}
                <TabsContent value="location" className="grid items-center gap-4 sm:flex">
                    <Select>
                        <SelectTrigger className="h-10 w-full rounded-3xl border-gray-600 bg-gray-400/5 text-gray-200 backdrop-blur-sm">
                            <SelectValue placeholder="Please select location" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-600 bg-accent-foreground/80 backdrop-blur-xl">
                            <SelectItem value="dhaka" className="text-gray-200">
                                Dhaka
                            </SelectItem>
                            <SelectItem value="chittagong" className="text-gray-200">
                                Chittagong
                            </SelectItem>
                            <SelectItem value="rajshahi" className="text-gray-200">
                                Rajshahi
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="secondary" className="text-md rounded-3xl sm:w-40">
                        <Search className="mr-1 h-4 w-4" />
                        Search
                    </Button>
                </TabsContent>

                {/* University tab */}
                <TabsContent value="university" className="grid items-center gap-4 sm:flex">
                    <Input className="h-10 rounded-3xl border-gray-600 bg-gray-400/5 text-sm backdrop-blur-sm" placeholder="Enter university name" />
                    <Button variant="secondary" className="text-md rounded-3xl sm:w-40">
                        <Search className="mr-1 h-4 w-4" />
                        Search
                    </Button>
                </TabsContent>

                {/* Courses tab */}
                <TabsContent value="courses" className="grid items-center gap-4 sm:flex">
                    <Input className="h-10 rounded-3xl border-gray-600 bg-gray-400/5 text-sm backdrop-blur-sm" placeholder="Search courses" />
                    <Button variant="secondary" className="text-md rounded-3xl sm:w-40">
                        <Search className="mr-1 h-4 w-4" />
                        Search
                    </Button>
                </TabsContent>

                {/* Events tab */}
                <TabsContent value="events" className="grid items-center gap-4 sm:flex">
                    <Input className="h-10 rounded-3xl border-gray-600 bg-gray-400/5 text-sm backdrop-blur-sm" placeholder="Search events" />
                    <Button variant="secondary" className="text-md rounded-3xl sm:w-40">
                        <Search className="mr-1 h-4 w-4" />
                        Search
                    </Button>
                </TabsContent>
            </Tabs>
        </div>
    );
}
