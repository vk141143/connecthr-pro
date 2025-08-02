import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-6">
          <div className="p-4 bg-destructive/10 rounded-full w-fit mx-auto">
            <Shield className="h-12 w-12 text-destructive" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground">
              You don't have permission to access this page. Please contact your administrator if you believe this is an error.
            </p>
          </div>

          <Button 
            onClick={() => navigate('/dashboard')} 
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;