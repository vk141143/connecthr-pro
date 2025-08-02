import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
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
  Ticket,
  Eye,
  CalendarDays
} from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  department: string;
  status: 'active' | 'absent' | 'break';
  hoursToday: string;
  performance: number;
}

interface LeaveRequest {
  id: number;
  employeeName: string;
  type: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface SupportTicket {
  id: number;
  employeeName: string;
  title: string;
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  createdDate: string;
}

interface Holiday {
  id: number;
  name: string;
  date: string;
  type: string;
}

interface PayslipUpload {
  id: number;
  month: string;
  employeeName: string;
  amount: string;
  status: 'uploaded' | 'sent';
}

const HRDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [loginHours, setLoginHours] = useState(0);
  const [loginMinutes, setLoginMinutes] = useState(0);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);

  // State management
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'John Doe', department: 'Engineering', status: 'active', hoursToday: '8h 15m', performance: 92 },
    { id: 2, name: 'Alice Smith', department: 'Marketing', status: 'active', hoursToday: '7h 45m', performance: 88 },
    { id: 3, name: 'Bob Johnson', department: 'Sales', status: 'absent', hoursToday: '0h 0m', performance: 85 },
    { id: 4, name: 'Carol Williams', department: 'Engineering', status: 'active', hoursToday: '8h 30m', performance: 94 },
  ]);

  const [pendingLeaves, setPendingLeaves] = useState<LeaveRequest[]>([
    { id: 1, employeeName: 'John Doe', type: 'Annual Leave', fromDate: '2024-01-20', toDate: '2024-01-22', days: 3, reason: 'Family vacation', status: 'pending' },
    { id: 2, employeeName: 'Alice Smith', type: 'Sick Leave', fromDate: '2024-01-15', toDate: '2024-01-15', days: 1, reason: 'Medical appointment', status: 'pending' },
  ]);

  const [openTickets, setOpenTickets] = useState<SupportTicket[]>([
    { id: 1, employeeName: 'Bob Johnson', title: 'Computer running slow', category: 'IT Support', description: 'My computer has been running very slowly lately, affecting my productivity', priority: 'medium', status: 'open', createdDate: '2024-01-10' },
    { id: 2, employeeName: 'Carol Williams', title: 'Request for new software license', category: 'Software', description: 'Need Adobe Photoshop license for design work', priority: 'low', status: 'open', createdDate: '2024-01-12' },
  ]);

  const [holidays, setHolidays] = useState<Holiday[]>([
    { id: 1, name: 'New Year Day', date: '2024-01-01', type: 'National' },
    { id: 2, name: 'Independence Day', date: '2024-07-04', type: 'National' },
    { id: 3, name: 'Christmas Day', date: '2024-12-25', type: 'National' },
  ]);

  const [payslips, setPayslips] = useState<PayslipUpload[]>([
    { id: 1, month: 'December 2023', employeeName: 'John Doe', amount: '$5,500', status: 'sent' },
    { id: 2, month: 'December 2023', employeeName: 'Alice Smith', amount: '$4,800', status: 'uploaded' },
  ]);

  // Dialog states
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [isPayslipDialogOpen, setIsPayslipDialogOpen] = useState(false);
  const [isHolidayDialogOpen, setIsHolidayDialogOpen] = useState(false);

  // Form states
  const [payslipForm, setPayslipForm] = useState({ month: '', files: null as FileList | null });
  const [holidayForm, setHolidayForm] = useState({ name: '', date: '', type: 'National' });

  // Timer effect for login hours
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCheckedIn && checkInTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - checkInTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setLoginHours(hours);
        setLoginMinutes(minutes);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn, checkInTime]);

  const handleCheckInOut = () => {
    if (!isCheckedIn) {
      setCheckInTime(new Date());
      setLoginHours(0);
      setLoginMinutes(0);
    } else {
      setCheckInTime(null);
    }
    setIsCheckedIn(!isCheckedIn);
    
    toast({
      title: isCheckedIn ? "Checked Out" : "Checked In",
      description: `You have successfully ${isCheckedIn ? 'checked out' : 'checked in'} at ${new Date().toLocaleTimeString()}`,
    });
  };

  const handleLeaveAction = (leaveId: number, action: 'approve' | 'reject') => {
    setPendingLeaves(pendingLeaves.map(leave => 
      leave.id === leaveId 
        ? { ...leave, status: action === 'approve' ? 'approved' : 'rejected' }
        : leave
    ));
    
    const leave = pendingLeaves.find(l => l.id === leaveId);
    toast({
      title: `Leave ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `${leave?.employeeName}'s leave request has been ${action === 'approve' ? 'approved' : 'rejected'}`,
    });
  };

  const handleTicketResolve = (ticketId: number) => {
    setOpenTickets(openTickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: 'resolved' }
        : ticket
    ));
    
    const ticket = openTickets.find(t => t.id === ticketId);
    toast({
      title: "Ticket Resolved",
      description: `Support ticket "${ticket?.title}" has been resolved`,
    });
  };

  const handleViewTicketDetails = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsTicketDialogOpen(true);
  };

  const handleUploadPayslips = () => {
    if (!payslipForm.month) {
      toast({
        title: "Error",
        description: "Please select a month",
        variant: "destructive"
      });
      return;
    }

    // Simulate payslip upload
    const newPayslips = employees.map(emp => ({
      id: Math.random(),
      month: payslipForm.month,
      employeeName: emp.name,
      amount: '$5,500', // Mock amount
      status: 'uploaded' as const
    }));

    setPayslips([...payslips, ...newPayslips]);
    setPayslipForm({ month: '', files: null });
    setIsPayslipDialogOpen(false);
    
    toast({
      title: "Payslips Uploaded",
      description: `Payslips for ${payslipForm.month} have been uploaded successfully`,
    });
  };

  const handleAddHoliday = () => {
    if (!holidayForm.name.trim() || !holidayForm.date) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newHoliday: Holiday = {
      id: Math.max(...holidays.map(h => h.id)) + 1,
      name: holidayForm.name,
      date: holidayForm.date,
      type: holidayForm.type
    };

    setHolidays([...holidays, newHoliday]);
    setHolidayForm({ name: '', date: '', type: 'National' });
    setIsHolidayDialogOpen(false);
    
    toast({
      title: "Holiday Added",
      description: `${newHoliday.name} has been added to the company calendar`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'resolved':
      case 'sent':
        return <Badge variant="secondary" className="bg-success text-success-foreground">{status}</Badge>;
      case 'absent':
      case 'rejected':
        return <Badge variant="destructive">{status}</Badge>;
      case 'break':
      case 'pending':
      case 'open':
      case 'uploaded':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">{status}</Badge>;
      case 'in-progress':
        return <Badge variant="default">{status}</Badge>;
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
                {isCheckedIn && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Current Session:</span>
                    <span className="text-sm font-bold text-primary">
                      {loginHours}h {loginMinutes}m
                    </span>
                  </div>
                )}
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
                {pendingLeaves.filter(l => l.status === 'pending').length} Pending
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
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {leave.days} day{leave.days > 1 ? 's' : ''}
                          </Badge>
                          {getStatusBadge(leave.status)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Period:</span> {leave.fromDate} to {leave.toDate}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Reason:</span> {leave.reason}
                        </p>
                      </div>
                      {leave.status === 'pending' && (
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
                      )}
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
                {openTickets.filter(t => t.status === 'open').length} Open
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
                          {getStatusBadge(ticket.status)}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {ticket.status === 'open' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleTicketResolve(ticket.id)}
                            className="bg-success hover:bg-success/90"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Resolve
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewTicketDetails(ticket)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
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
              <Dialog open={isPayslipDialogOpen} onOpenChange={setIsPayslipDialogOpen}>
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
                      <Input 
                        type="month" 
                        value={payslipForm.month}
                        onChange={(e) => setPayslipForm({ ...payslipForm, month: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Payslip Files</Label>
                      <Input 
                        type="file" 
                        multiple 
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setPayslipForm({ ...payslipForm, files: e.target.files })}
                      />
                      <p className="text-xs text-muted-foreground">
                        Upload PDF or DOC files. Multiple files supported.
                      </p>
                    </div>
                    <Button className="w-full" onClick={handleUploadPayslips}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Payslips
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4">
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
                        <p className="text-2xl font-bold text-primary">{payslips.length}</p>
                        <p className="text-xs text-muted-foreground">This Month</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-success">{payslips.filter(p => p.status === 'sent').length}</p>
                        <p className="text-xs text-muted-foreground">Sent</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-warning">{payslips.filter(p => p.status === 'uploaded').length}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {payslips.map((payslip) => (
                <Card key={payslip.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{payslip.employeeName}</h4>
                        <p className="text-sm text-muted-foreground">{payslip.month} • {payslip.amount}</p>
                      </div>
                      {getStatusBadge(payslip.status)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Holidays Tab */}
          <TabsContent value="holidays" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Company Holidays</h3>
              <Dialog open={isHolidayDialogOpen} onOpenChange={setIsHolidayDialogOpen}>
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
                      <Input 
                        placeholder="Enter holiday name" 
                        value={holidayForm.name}
                        onChange={(e) => setHolidayForm({ ...holidayForm, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input 
                        type="date" 
                        value={holidayForm.date}
                        onChange={(e) => setHolidayForm({ ...holidayForm, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Input 
                        placeholder="e.g., National, Regional, Company" 
                        value={holidayForm.type}
                        onChange={(e) => setHolidayForm({ ...holidayForm, type: e.target.value })}
                      />
                    </div>
                    <Button className="w-full" onClick={handleAddHoliday}>
                      Add Holiday
                    </Button>
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
        </Tabs>

        {/* Ticket Details Dialog */}
        <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ticket Details</DialogTitle>
              <DialogDescription>
                Full details of the support ticket
              </DialogDescription>
            </DialogHeader>
            {selectedTicket && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">{selectedTicket.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Submitted by {selectedTicket.employeeName} on {selectedTicket.createdDate}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {getPriorityBadge(selectedTicket.priority)}
                  <Badge variant="outline">{selectedTicket.category}</Badge>
                  {getStatusBadge(selectedTicket.status)}
                </div>
                <div>
                  <Label className="text-sm font-medium">Description:</Label>
                  <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                    {selectedTicket.description}
                  </p>
                </div>
                {selectedTicket.status === 'open' && (
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => {
                        handleTicketResolve(selectedTicket.id);
                        setIsTicketDialogOpen(false);
                      }}
                      className="bg-success hover:bg-success/90"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Resolve Ticket
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboard;