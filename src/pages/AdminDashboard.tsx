import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Building, 
  BarChart3, 
  Settings, 
  Shield, 
  Plus,
  TrendingUp,
  DollarSign,
  Clock,
  UserPlus,
  Database,
  AlertTriangle
} from 'lucide-react';

const AdminDashboard = () => {
  // Mock data
  const systemStats = {
    totalEmployees: 156,
    activeUsers: 142,
    totalDepartments: 8,
    monthlyPayroll: '$875,420',
    avgWorkingHours: '7.8h',
    pendingRequests: 12
  };

  const departmentData = [
    { name: 'Engineering', employees: 45, budget: '$450,000', performance: 92 },
    { name: 'Marketing', employees: 23, budget: '$180,000', performance: 88 },
    { name: 'Sales', employees: 32, budget: '$240,000', performance: 90 },
    { name: 'HR', employees: 8, budget: '$120,000', performance: 86 },
    { name: 'Finance', employees: 15, budget: '$200,000', performance: 94 },
  ];

  const recentActivities = [
    { id: 1, action: 'New employee onboarding', user: 'Sarah Wilson (HR)', time: '2 hours ago', type: 'user' },
    { id: 2, action: 'Payroll processed', user: 'System', time: '1 day ago', type: 'payroll' },
    { id: 3, action: 'Leave policy updated', user: 'Michael Chen (Admin)', time: '2 days ago', type: 'policy' },
    { id: 4, action: 'Department budget approved', user: 'Michael Chen (Admin)', time: '3 days ago', type: 'budget' },
  ];

  const systemAlerts = [
    { id: 1, message: 'Server backup completed successfully', type: 'success', time: '1 hour ago' },
    { id: 2, message: 'High number of leave requests pending', type: 'warning', time: '3 hours ago' },
    { id: 3, message: 'Monthly payroll due in 3 days', type: 'info', time: '6 hours ago' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <UserPlus className="h-4 w-4" />;
      case 'payroll':
        return <DollarSign className="h-4 w-4" />;
      case 'policy':
        return <Shield className="h-4 w-4" />;
      case 'budget':
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge variant="secondary" className="bg-success text-success-foreground">Success</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Warning</Badge>;
      case 'info':
        return <Badge variant="default">Info</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">System Administration</h2>
                <p className="text-muted-foreground">Complete control and oversight of the employee management system</p>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-lg font-semibold">Admin Panel</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{systemStats.totalEmployees}</p>
                  <p className="text-sm text-muted-foreground">Total Employees</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold">{systemStats.activeUsers}</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Building className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{systemStats.totalDepartments}</p>
                  <p className="text-sm text-muted-foreground">Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{systemStats.monthlyPayroll}</p>
                  <p className="text-sm text-muted-foreground">Monthly Payroll</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{systemStats.avgWorkingHours}</p>
                  <p className="text-sm text-muted-foreground">Avg Working Hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{systemStats.pendingRequests}</p>
                  <p className="text-sm text-muted-foreground">Pending Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="system">System Settings</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest system activities and changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>Important notifications and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start justify-between space-x-3">
                        <div className="flex-1">
                          <p className="text-sm">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                        {getAlertBadge(alert.type)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Department Management</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Department
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Department</DialogTitle>
                    <DialogDescription>Add a new department to the organization</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Department Name</Label>
                      <Input placeholder="Enter department name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Budget</Label>
                      <Input placeholder="Enter budget amount" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label>Department Head</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department head" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emp1">John Doe</SelectItem>
                          <SelectItem value="emp2">Sarah Wilson</SelectItem>
                          <SelectItem value="emp3">Michael Chen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Create Department</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4">
              {departmentData.map((dept, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Building className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-medium">{dept.name}</h4>
                          <p className="text-sm text-muted-foreground">{dept.employees} employees</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm font-medium">Budget</p>
                          <p className="text-lg font-bold text-primary">{dept.budget}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">Performance</p>
                          <p className="text-lg font-bold text-success">{dept.performance}%</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">User Management</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>Add a new user to the system</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input placeholder="Enter first name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input placeholder="Enter last name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input placeholder="Enter email address" type="email" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employee">Employee</SelectItem>
                            <SelectItem value="hr">HR</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Department</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="eng">Engineering</SelectItem>
                            <SelectItem value="hr">Human Resources</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full">Create User</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h4 className="font-medium">User Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Manage user accounts, roles, and permissions
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">156</p>
                      <p className="text-xs text-muted-foreground">Total Users</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-success">142</p>
                      <p className="text-xs text-muted-foreground">Active</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-warning">14</p>
                      <p className="text-xs text-muted-foreground">Inactive</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="system" className="space-y-4">
            <h3 className="text-lg font-semibold">System Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>General Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input defaultValue="WorkFlow Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label>Working Hours</Label>
                    <Select defaultValue="8">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 hours</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="9">9 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Password Policy</Label>
                    <Select defaultValue="strong">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="strong">Strong</SelectItem>
                        <SelectItem value="complex">Complex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input defaultValue="60" type="number" />
                  </div>
                  <Button>Update Security</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <h3 className="text-lg font-semibold">System Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <BarChart3 className="h-12 w-12 text-primary mx-auto" />
                  <div>
                    <h4 className="font-medium">Employee Performance</h4>
                    <p className="text-sm text-muted-foreground">Detailed performance analytics</p>
                  </div>
                  <Button variant="outline" className="w-full">Generate Report</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <Clock className="h-12 w-12 text-accent mx-auto" />
                  <div>
                    <h4 className="font-medium">Attendance Report</h4>
                    <p className="text-sm text-muted-foreground">Working hours and attendance</p>
                  </div>
                  <Button variant="outline" className="w-full">Generate Report</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <DollarSign className="h-12 w-12 text-success mx-auto" />
                  <div>
                    <h4 className="font-medium">Payroll Report</h4>
                    <p className="text-sm text-muted-foreground">Salary and compensation data</p>
                  </div>
                  <Button variant="outline" className="w-full">Generate Report</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;