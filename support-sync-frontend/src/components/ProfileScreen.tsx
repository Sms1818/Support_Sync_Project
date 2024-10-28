"use client"

import { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CreditCard, LogOut, PieChart, Settings } from "lucide-react"
import NavBar from "./NavBar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfileScreen() {
    const { user, logout } = useAuth0()
    const [activeTab, setActiveTab] = useState("add-config")

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } })
    }

    const menuItems = [
        { id: "add-config", label: "Add Config", icon: Settings },
        // { id: "keys", label: "Keys", icon: Key },
        { id: "billing", label: "Billing", icon: CreditCard },
        { id: "usage", label: "Usage", icon: PieChart },
    ]

    const renderTabContent = () => {
        switch (activeTab) {
            case "add-config":
                return (
                    <div className="w-full">
                        <Tabs defaultValue="jira" className="w-full">
                            <TabsList className="w-full justify-start bg-transparent mb-6 flex-nowrap">
                                <TabsTrigger value="jira" className="px-4 py-2">Jira</TabsTrigger>
                                <TabsTrigger value="clickup" className="px-4 py-2">ClickUp</TabsTrigger>
                                <TabsTrigger value="salesforce" className="px-4 py-2">SalesForce</TabsTrigger>
                                <TabsTrigger value="customAPI" className="px-4 py-2">CustomAPI</TabsTrigger>
                            </TabsList>

                            <TabsContent value="jira" className="">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="jira-email">Jira Email</Label>
                                        <Input id="jira-email" type="text" placeholder="Jira Email" className="bg-gray-800 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="jira-api-token">Jira API Token</Label>
                                        <Input id="jira-api-token" type="password" placeholder="Jira API Token" className="bg-gray-800 text-white" />
                                    </div>
                                    <Button className="w-full sm:w-auto">Save Jira Config</Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="clickup" className="">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="clickup-api-token">ClickUp API Token</Label>
                                        <Input id="clickup-api-token" type="text" placeholder="ClickUp API Token" className="bg-gray-800 text-white" />
                                    </div>
                                    <Button className="w-full sm:w-auto">Save ClickUp Config</Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="salesforce" className="">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input id="username" type="text" placeholder="Username" className="bg-gray-800 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="clienttocken">Client Token</Label>
                                        <Input id="clienttocken" type="text" placeholder="Client Token" className="bg-gray-800 text-white" />
                                    </div>
                                    <Button className="w-full sm:w-auto">Save SalesForce Config</Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="customAPI" className="">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="custom-api-field">Custom API Field</Label>
                                        <Input id="custom-api-field" type="text" placeholder="Custom API Field" className="bg-gray-800 text-white" />
                                    </div>
                                    <Button className="w-full sm:w-auto">Save Custom API Config</Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                )

            // case "keys":
            //     return (
            //         <div className="space-y-6 text-white">
            //             <h3 className="text-lg font-semibold mb-4">API Keys</h3>
            //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            //                 <span>Production Key</span>
            //                 <Button variant="outline" size="sm">
            //                     Regenerate
            //                 </Button>
            //             </div>
            //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            //                 <span>Development Key</span>
            //                 <Button variant="outline" size="sm">
            //                     Regenerate
            //                 </Button>
            //             </div>
            //         </div>
            //     )
            case "billing":
                return (
                    <div className="space-y-6 text-white">
                        <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
                        <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input type="text" id="card-number" placeholder="**** **** **** 1234" className="bg-gray-800 text-white" />
                        </div>
                        <Button className="w-full sm:w-auto">Update Billing Info</Button>
                    </div>
                )
            case "usage":
                return (
                    <div className="space-y-6 text-white">
                        <h3 className="text-lg font-semibold mb-4">Usage Statistics</h3>
                        <div className="flex justify-between items-center">
                            <span>API Calls This Month</span>
                            <span className="font-semibold">5,432</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Data Processed</span>
                            <span className="font-semibold">1.2 GB</span>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#001f3f] via-[#00172e] to-[#001030] text-white">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <NavBar />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Card className="mt-16 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-white border-opacity-20 text-white">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user?.picture} alt={user?.name} />
                                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-center sm:text-left">
                                <CardTitle className="text-2xl font-bold">{user?.name}</CardTitle>
                                <CardDescription className="text-muted-foreground">{user?.email}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Separator className="my-6" />
                        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                            <div className="w-full md:w-1/4 space-y-2">
                                {menuItems.map((item) => (
                                    <Button
                                        key={item.id}
                                        variant={activeTab === item.id ? "secondary" : "ghost"}
                                        className={`w-full justify-start ${activeTab === item.id ? "text-black bg-white" : "text-white"
                                            }`}
                                        onClick={() => setActiveTab(item.id)}
                                    >
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </Button>
                                ))}
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            </div>
                            <Separator orientation="vertical" className="hidden md:block" />
                            <div className="w-full md:w-3/4 bg-white bg-opacity-5 rounded-lg p-6">
                                {renderTabContent()}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}