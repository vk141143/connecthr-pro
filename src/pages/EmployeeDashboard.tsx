import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Clock, 
  Calendar, 
  CheckCircle, 
  Plus, 
  Download, 
  AlertCircle, 
  PlayCircle, 
  PauseCircle,
  FileText,
  Ticket,
  CalendarDays,
  DollarSign
} from 'lucide-react';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState('09:30 AM');

  // Mock data
  const todayHours = '7h 30m';
  const weekHours = '37h 45m';
  const monthHours = '158h 20m';

  const tasks = [
    { id: 1, title: 'Review project documentation', status: 'pending', priority: 'high', dueDate: '2024-01-15' },
    { id: 2, title: 'Update user interface mockups', status: 'in-progress', priority: 'medium', dueDate: '2024-01-16' },
    { id: 3, title: 'Test new features', status: 'completed', priority: 'low', dueDate: '2024-01-14' },
  ];

  const leaves = [
    { id: 1, type: 'Annual Leave', fromDate: '2024-01-20', toDate: '2024-01-22', status: 'approved', days: 3 },
    { id: 2, type: 'Sick Leave', fromDate: '2024-01-10', toDate: '2024-01-10', status: 'pending', days: 1 },
  ];

  const holidays = [
    { id: 1, name: 'New Year Day', date: '2024-01-01', type: 'National' },
    { id: 2, name: 'Independence Day', date: '2024-07-04', type: 'National' },
    { id: 3, name: 'Christmas Day', date: '2024-12-25', type: 'National' },
  ];

  const payslips = [
    { id: 1, month: 'December 2023', amount: '$5,500', status: 'paid' },
    { id: 2, month: 'November 2023', amount: '$5,500', status: 'paid' },
    { id: 3, month: 'October 2023', amount: '$5,500', status: 'paid' },
  ];

  const tickets = [
    { id: 1, title: 'Computer running slow', category: 'IT Support', status: 'open', priority: 'medium' },
    { id: 2, title: 'Request for new software license', category: 'Software', status: 'resolved', priority: 'low' },
  ];

  const handleCheckInOut = () => {
    setIsCheckedIn(!isCheckedIn);
    setCurrentTime(new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
      case 'paid':
      case 'resolved':
        return <Badge variant="secondary" className="bg-success text-success-foreground">✓ {status}</Badge>;
      case 'in-progress':
      case 'pending':
      case 'open':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">⏳ {status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="default">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <DashboardLayout title="Employee Dashboard">
      <div className="space-y-6">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Welcome back, {user?.name}!</h2>
                <p className="text-muted-foreground">Employee ID: {user?.employeeId} • {user?.department}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Check In/Out Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Time Tracking</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Status:</span>
                  <Badge variant={isCheckedIn ? "secondary" : "outline"} className={isCheckedIn ? "bg-success text-success-foreground" : ""}>
                    {isCheckedIn ? 'Checked In' : 'Checked Out'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Action:</span>
                  <span className="text-sm">{currentTime}</span>
                </div>
                <Button
                  onClick={handleCheckInOut}
                  className="w-full"
                  variant={isCheckedIn ? "outline" : "default"}
                >
                  {isCheckedIn ? (
                    <>
                      <PauseCircle className="h-4 w-4 mr-2" />
                      Check Out
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Check In
                    </>
                  )}
                </Button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{todayHours}</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{weekHours}</p>
                    <p className="text-xs text-muted-foreground">This Week</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{monthHours}</p>
                    <p className="text-xs text-muted-foreground">This Month</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="tasks" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="leaves">Leaves</TabsTrigger>
            <TabsTrigger value="holidays">Holidays</TabsTrigger>
            <TabsTrigger value="payslips">Payslips</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">My Tasks</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>Add a new task to your list</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Task Title</Label>
                      <Input placeholder="Enter task title" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea placeholder="Enter task description" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Due Date</Label>
                        <Input type="date" />
                      </div>
                    </div>
                    <Button className="w-full">Create Task</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4">
              {tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getPriorityBadge(task.priority)}
                        {getStatusBadge(task.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaves Tab */}
          <TabsContent value="leaves" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Leave Management</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Apply Leave
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply for Leave</DialogTitle>
                    <DialogDescription>Submit a new leave request</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Leave Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="annual">Annual Leave</SelectItem>
                          <SelectItem value="sick">Sick Leave</SelectItem>
                          <SelectItem value="personal">Personal Leave</SelectItem>
                          <SelectItem value="emergency">Emergency Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>From Date</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>To Date</Label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Reason</Label>
                      <Textarea placeholder="Enter reason for leave" />
                    </div>
                    <Button className="w-full">Submit Request</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4">
              {leaves.map((leave) => (
                <Card key={leave.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{leave.type}</h4>
                        <p className="text-sm text-muted-foreground">
                          {leave.fromDate} to {leave.toDate} ({leave.days} days)
                        </p>
                      </div>
                      {getStatusBadge(leave.status)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Holidays Tab */}
          <TabsContent value="holidays" className="space-y-4">
            <h3 className="text-lg font-semibold">Company Holidays</h3>
            <div className="grid gap-4">
              {holidays.map((holiday) => (
                <Card key={holiday.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CalendarDays className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">{holiday.name}</h4>
                          <p className="text-sm text-muted-foreground">{holiday.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{holiday.type}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Payslips Tab */}
          <TabsContent value="payslips" className="space-y-4">
            <h3 className="text-lg font-semibold">Payslips</h3>
            <div className="grid gap-4">
              {payslips.map((payslip) => (
                <Card key={payslip.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">{payslip.month}</h4>
                          <p className="text-sm text-muted-foreground">Amount: {payslip.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(payslip.status)}
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Support Tickets</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Ticket
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Support Ticket</DialogTitle>
                    <DialogDescription>Report an issue or request support</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Input placeholder="Brief description of the issue" />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it">IT Support</SelectItem>
                          <SelectItem value="hr">HR Related</SelectItem>
                          <SelectItem value="facilities">Facilities</SelectItem>
                          <SelectItem value="software">Software</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea placeholder="Detailed description of the issue" />
                    </div>
                    <Button className="w-full">Submit Ticket</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Ticket className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">{ticket.title}</h4>
                          <p className="text-sm text-muted-foreground">Category: {ticket.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getPriorityBadge(ticket.priority)}
                        {getStatusBadge(ticket.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <h3 className="text-lg font-semibold">My Profile</h3>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                      <p className="font-medium">{user?.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Employee ID</Label>
                      <p className="font-medium">{user?.employeeId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                      <p className="font-medium">{user?.department}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Role</Label>
                      <p className="font-medium capitalize">{user?.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;