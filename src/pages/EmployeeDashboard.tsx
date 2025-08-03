import { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { useTimer } from '@/hooks/useTimer';
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
  DollarSign,
  Edit,
  Save,
  X
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface Leave {
  id: number;
  type: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  days: number;
}

interface SupportTicket {
  id: number;
  title: string;
  category: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdDate: string;
}

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string>('');
  const [checkOutTime, setCheckOutTime] = useState<string>('');
  const timer = useTimer();

  // State for tasks
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Review project documentation', description: 'Go through the project specs', status: 'pending', priority: 'high', dueDate: '2024-01-15' },
    { id: 2, title: 'Update user interface mockups', description: 'Redesign the main dashboard', status: 'in-progress', priority: 'medium', dueDate: '2024-01-16' },
    { id: 3, title: 'Test new features', description: 'Complete QA testing', status: 'completed', priority: 'low', dueDate: '2024-01-14' },
  ]);

  // State for leaves
  const [leaves, setLeaves] = useState<Leave[]>([
    { id: 1, type: 'Annual Leave', fromDate: '2024-01-20', toDate: '2024-01-22', reason: 'Family vacation', status: 'approved', days: 3 },
    { id: 2, type: 'Sick Leave', fromDate: '2024-01-10', toDate: '2024-01-10', reason: 'Medical appointment', status: 'pending', days: 1 },
  ]);

  // State for tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    { id: 1, title: 'Computer running slow', category: 'IT Support', description: 'My computer has been running very slowly lately', status: 'open', priority: 'medium', createdDate: '2024-01-10' },
    { id: 2, title: 'Request for new software license', category: 'Software', description: 'Need Adobe Photoshop license', status: 'resolved', priority: 'low', createdDate: '2024-01-12' },
  ]);

  // Dialog states
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Form states
  const [taskForm, setTaskForm] = useState({ title: '', description: '', priority: 'medium', dueDate: '' });
  const [leaveForm, setLeaveForm] = useState({ type: '', fromDate: '', toDate: '', reason: '' });
  const [ticketForm, setTicketForm] = useState({ title: '', category: '', description: '', priority: 'medium' });
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', email: user?.email || '', department: user?.department || '' });


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

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString();
    setCheckInTime(now);
    setCheckOutTime('');
    setIsCheckedIn(true);
    timer.reset();
    timer.start();
    toast({
      title: "Checked In",
      description: `Welcome! You checked in at ${now}`,
    });
  };

  const handleCheckOut = () => {
    const now = new Date().toLocaleTimeString();
    setCheckOutTime(now);
    setIsCheckedIn(false);
    timer.stop();
    toast({
      title: "Checked Out",
      description: `You checked out at ${now}. Total time: ${timer.formattedTime}`,
    });
  };

  const handleCreateTask = () => {
    if (!taskForm.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a task title",
        variant: "destructive"
      });
      return;
    }

    const newTask: Task = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      title: taskForm.title,
      description: taskForm.description,
      status: 'pending',
      priority: taskForm.priority as 'low' | 'medium' | 'high',
      dueDate: taskForm.dueDate
    };

    setTasks([...tasks, newTask]);
    setTaskForm({ title: '', description: '', priority: 'medium', dueDate: '' });
    setIsTaskDialogOpen(false);
    
    toast({
      title: "Task Created",
      description: "Your task has been created successfully",
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      dueDate: task.dueDate
    });
    setIsTaskDialogOpen(true);
  };

  const handleUpdateTask = () => {
    if (!editingTask) return;

    setTasks(tasks.map(task => 
      task.id === editingTask.id 
        ? { 
            ...task, 
            title: taskForm.title,
            description: taskForm.description,
            priority: taskForm.priority as 'low' | 'medium' | 'high',
            dueDate: taskForm.dueDate
          }
        : task
    ));
    
    setEditingTask(null);
    setTaskForm({ title: '', description: '', priority: 'medium', dueDate: '' });
    setIsTaskDialogOpen(false);
    
    toast({
      title: "Task Updated",
      description: "Your task has been updated successfully",
    });
  };

  const handleApplyLeave = () => {
    if (!leaveForm.type || !leaveForm.fromDate || !leaveForm.toDate || !leaveForm.reason.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const fromDate = new Date(leaveForm.fromDate);
    const toDate = new Date(leaveForm.toDate);
    const days = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24)) + 1;

    const newLeave: Leave = {
      id: Math.max(...leaves.map(l => l.id)) + 1,
      type: leaveForm.type,
      fromDate: leaveForm.fromDate,
      toDate: leaveForm.toDate,
      reason: leaveForm.reason,
      status: 'pending',
      days
    };

    setLeaves([...leaves, newLeave]);
    setLeaveForm({ type: '', fromDate: '', toDate: '', reason: '' });
    setIsLeaveDialogOpen(false);
    
    toast({
      title: "Leave Applied",
      description: "Your leave request has been submitted successfully",
    });
  };

  const handleCreateTicket = () => {
    if (!ticketForm.title.trim() || !ticketForm.category || !ticketForm.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newTicket: SupportTicket = {
      id: Math.max(...tickets.map(t => t.id)) + 1,
      title: ticketForm.title,
      category: ticketForm.category,
      description: ticketForm.description,
      status: 'open',
      priority: ticketForm.priority as 'low' | 'medium' | 'high',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setTickets([...tickets, newTicket]);
    setTicketForm({ title: '', category: '', description: '', priority: 'medium' });
    setIsTicketDialogOpen(false);
    
    toast({
      title: "Ticket Created",
      description: "Your support ticket has been submitted successfully",
    });
  };

  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
    setIsProfileDialogOpen(false);
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
      case 'rejected':
        return <Badge variant="destructive">✗ {status}</Badge>;
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
                  <span className="text-sm font-medium">Check-in Time:</span>
                  <span className="text-sm">{checkInTime || 'Not checked in'}</span>
                </div>
                {checkOutTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Check-out Time:</span>
                    <span className="text-sm">{checkOutTime}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Session Time:</span>
                  <span className="text-sm font-bold text-primary text-lg">
                    {timer.formattedTime}
                  </span>
                </div>
                {!isCheckedIn ? (
                  <Button onClick={handleCheckIn} className="w-full">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Check In
                  </Button>
                ) : (
                  <Button onClick={handleCheckOut} variant="outline" className="w-full">
                    <PauseCircle className="h-4 w-4 mr-2" />
                    Check Out
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {timer.formattedTime}
                    </p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">37h 45m</p>
                    <p className="text-xs text-muted-foreground">This Week</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">158h 20m</p>
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
              <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingTask(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
                    <DialogDescription>
                      {editingTask ? 'Update your task details' : 'Add a new task to your list'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Task Title</Label>
                      <Input 
                        placeholder="Enter task title" 
                        value={taskForm.title}
                        onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea 
                        placeholder="Enter task description" 
                        value={taskForm.description}
                        onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select value={taskForm.priority} onValueChange={(value) => setTaskForm({ ...taskForm, priority: value })}>
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
                        <Input 
                          type="date" 
                          value={taskForm.dueDate}
                          onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={editingTask ? handleUpdateTask : handleCreateTask}
                    >
                      {editingTask ? 'Update Task' : 'Create Task'}
                    </Button>
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
                        {task.description && (
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        )}
                        <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditTask(task)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
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
              <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
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
                      <Select value={leaveForm.type} onValueChange={(value) => setLeaveForm({ ...leaveForm, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                          <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                          <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                          <SelectItem value="Emergency Leave">Emergency Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>From Date</Label>
                        <Input 
                          type="date" 
                          value={leaveForm.fromDate}
                          onChange={(e) => setLeaveForm({ ...leaveForm, fromDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>To Date</Label>
                        <Input 
                          type="date" 
                          value={leaveForm.toDate}
                          onChange={(e) => setLeaveForm({ ...leaveForm, toDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Reason</Label>
                      <Textarea 
                        placeholder="Enter reason for leave" 
                        value={leaveForm.reason}
                        onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                      />
                    </div>
                    <Button className="w-full" onClick={handleApplyLeave}>
                      Submit Request
                    </Button>
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
                        <p className="text-sm text-muted-foreground">Reason: {leave.reason}</p>
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
              <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
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
                      <Input 
                        placeholder="Brief description of the issue" 
                        value={ticketForm.title}
                        onChange={(e) => setTicketForm({ ...ticketForm, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={ticketForm.category} onValueChange={(value) => setTicketForm({ ...ticketForm, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IT Support">IT Support</SelectItem>
                          <SelectItem value="HR Related">HR Related</SelectItem>
                          <SelectItem value="Facilities">Facilities</SelectItem>
                          <SelectItem value="Software">Software</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm({ ...ticketForm, priority: value })}>
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
                      <Label>Description</Label>
                      <Textarea 
                        placeholder="Describe the issue in detail" 
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                      />
                    </div>
                    <Button className="w-full" onClick={handleCreateTicket}>
                      Submit Ticket
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{ticket.title}</h4>
                        <p className="text-sm text-muted-foreground">Category: {ticket.category}</p>
                        <p className="text-sm text-muted-foreground">Created: {ticket.createdDate}</p>
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
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">My Profile</h3>
              <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Update your personal information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input 
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input 
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input 
                        value={profileForm.department}
                        onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                      />
                    </div>
                    <Button className="w-full" onClick={handleUpdateProfile}>
                      Update Profile
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {user?.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">{user?.name}</h4>
                      <p className="text-muted-foreground">{user?.role?.toUpperCase()} • {user?.department}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Employee ID</p>
                      <p className="font-medium">{user?.employeeId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="font-medium">{user?.email}</p>
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