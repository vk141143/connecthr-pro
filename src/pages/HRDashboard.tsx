import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Upload, 
  Download,
  Calendar,
  TrendingUp,
  AlertTriangle,
  PlayCircle,
  PauseCircle,
  BarChart3,
  FileSpreadsheet,
  UserCheck,
  Ticket
} from 'lucide-react';

const HRDashboard = () => {
  const { user } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Mock data
  const employees = [
    { id: 1, name: 'John Doe', department: 'Engineering', status: 'active', hoursToday: '8h 15m', performance: 92 },
    { id: 2, name: 'Alice Smith', department: 'Marketing', status: 'active', hoursToday: '7h 45m', performance: 88 },
    { id: 3, name: 'Bob Johnson', department: 'Sales', status: 'absent', hoursToday: '0h 0m', performance: 85 },
    { id: 4, name: 'Carol Williams', department: 'Engineering', status: 'active', hoursToday: '8h 30m', performance: 94 },
  ];

  const pendingLeaves = [
    { id: 1, employeeName: 'John Doe', type: 'Annual Leave', fromDate: '2024-01-20', toDate: '2024-01-22', days: 3, reason: 'Family vacation' },
    { id: 2, employeeName: 'Alice Smith', type: 'Sick Leave', fromDate: '2024-01-15', toDate: '2024-01-15', days: 1, reason: 'Medical appointment' },
  ];

  const openTickets = [
    { id: 1, employeeName: 'Bob Johnson', title: 'Computer running slow', category: 'IT Support', priority: 'medium', createdDate: '2024-01-10' },
    { id: 2, employeeName: 'Carol Williams', title: 'Request for new software license', category: 'Software', priority: 'low', createdDate: '2024-01-12' },
  ];

  const holidays = [
    { id: 1, name: 'New Year Day', date: '2024-01-01', type: 'National' },
    { id: 2, name: 'Independence Day', date: '2024-07-04', type: 'National' },
    { id: 3, name: 'Christmas Day', date: '2024-12-25', type: 'National' },
  ];

  const handleCheckInOut = () => {
    setIsCheckedIn(!isCheckedIn);
  };

  const handleLeaveAction = (leaveId: number, action: 'approve' | 'reject') => {
    console.log(`${action} leave with id: ${leaveId}`);
  };

  const handleTicketResolve = (ticketId: number) => {
    console.log(`Resolve ticket with id: ${ticketId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-success text-success-foreground">Active</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'break':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">On Break</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
      case 'urgent':
        return <Badge variant="destructive">{priority}</Badge>;
      case 'medium':
        return <Badge variant="default">{priority}</Badge>;
      case 'low':
        return <Badge variant="secondary">{priority}</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <DashboardLayout title="HR Dashboard">
      <div className="space-y-6">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">HR Management Portal</h2>
                <p className="text-muted-foreground">Manage employees, leaves, and organizational activities</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{employees.length}</p>
                  <p className="text-sm text-muted-foreground">Total Employees</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{employees.filter(e => e.status === 'active').length}</p>
                  <p className="text-sm text-muted-foreground">Present Today</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HR Check In/Out Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>HR Time Tracking</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant={isCheckedIn ? "secondary" : "outline"} className={isCheckedIn ? "bg-success text-success-foreground" : ""}>
                    {isCheckedIn ? 'Checked In' : 'Checked Out'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Track your working hours as HR staff</p>
              </div>
              <Button
                onClick={handleCheckInOut}
                variant={isCheckedIn ? "outline" : "default"}
                size="lg"
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
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="employees" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="payslips">Payslip Management</TabsTrigger>
            <TabsTrigger value="holidays">Holidays</TabsTrigger>
          </TabsList>

          {/* Employees Tab */}
          <TabsContent value="employees" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Employee Performance & Attendance</h3>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
            <div className="grid gap-4">
              {employees.map((employee) => (
                <Card key={employee.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <UserCheck className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-medium">{employee.name}</h4>
                          <p className="text-sm text-muted-foreground">{employee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm font-medium">Hours Today</p>
                          <p className="text-lg font-bold text-primary">{employee.hoursToday}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">Performance</p>
                          <p className={`text-lg font-bold ${getPerformanceColor(employee.performance)}`}>
                            {employee.performance}%
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(employee.status)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leave Requests Tab */}
          <TabsContent value="leaves" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Pending Leave Requests</h3>
              <Badge variant="secondary" className="bg-warning text-warning-foreground">
                {pendingLeaves.length} Pending
              </Badge>
            </div>
            <div className="grid gap-4">
              {pendingLeaves.map((leave) => (
                <Card key={leave.id}>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{leave.employeeName}</h4>
                          <p className="text-sm text-muted-foreground">{leave.type}</p>
                        </div>
                        <Badge variant="outline">
                          {leave.days} day{leave.days > 1 ? 's' : ''}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Period:</span> {leave.fromDate} to {leave.toDate}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Reason:</span> {leave.reason}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleLeaveAction(leave.id, 'approve')}
                          className="bg-success hover:bg-success/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleLeaveAction(leave.id, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Support Tickets Tab */}
          <TabsContent value="tickets" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Open Support Tickets</h3>
              <Badge variant="secondary" className="bg-warning text-warning-foreground">
                {openTickets.length} Open
              </Badge>
            </div>
            <div className="grid gap-4">
              {openTickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Ticket className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">{ticket.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              By {ticket.employeeName} • {ticket.createdDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPriorityBadge(ticket.priority)}
                          <Badge variant="outline">{ticket.category}</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleTicketResolve(ticket.id)}
                          className="bg-success hover:bg-success/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Payslip Management Tab */}
          <TabsContent value="payslips" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Payslip Management</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Payslips
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Employee Payslips</DialogTitle>
                    <DialogDescription>
                      Upload payslips for multiple employees at once
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Month/Year</Label>
                      <Input type="month" />
                    </div>
                    <div className="space-y-2">
                      <Label>Payslip Files</Label>
                      <Input type="file" multiple accept=".pdf,.doc,.docx" />
                      <p className="text-xs text-muted-foreground">
                        Upload PDF or DOC files. Multiple files supported.
                      </p>
                    </div>
                    <Button className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Payslips
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <FileSpreadsheet className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h4 className="font-medium">Payslip Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Upload and manage employee payslips for each month
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">24</p>
                      <p className="text-xs text-muted-foreground">This Month</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-success">22</p>
                      <p className="text-xs text-muted-foreground">Sent</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-warning">2</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Holidays Tab */}
          <TabsContent value="holidays" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Company Holidays</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    Add Holiday
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Company Holiday</DialogTitle>
                    <DialogDescription>
                      Add a new holiday to the company calendar
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Holiday Name</Label>
                      <Input placeholder="Enter holiday name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Input placeholder="e.g., National, Religious, Company" />
                    </div>
                    <Button className="w-full">Add Holiday</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4">
              {holidays.map((holiday) => (
                <Card key={holiday.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-primary" />
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
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboard;