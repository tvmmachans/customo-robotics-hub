import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Bot, 
  Battery, 
  Wifi, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

const YourDevices = () => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Guardian Security Bot X1",
      type: "Security",
      status: "active",
      battery: 85,
      location: "Warehouse A - Zone 1",
      lastSeen: "2 minutes ago",
      isOnline: true,
      tasks: "Perimeter patrol active",
    },
    {
      id: 2,
      name: "HomePal Assistant Pro",
      type: "Assistant", 
      status: "idle",
      battery: 92,
      location: "Living Room",
      lastSeen: "5 minutes ago",
      isOnline: true,
      tasks: "Standby mode",
    },
    {
      id: 3,
      name: "IndustriMax Welder 3000",
      type: "Industrial",
      status: "maintenance",
      battery: 45,
      location: "Factory Floor B",
      lastSeen: "1 hour ago",
      isOnline: false,
      tasks: "Scheduled maintenance",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "idle":
        return "bg-yellow-500";
      case "maintenance":
        return "bg-red-500";
      default:
        return "bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />;
      case "idle":
        return <Clock className="h-4 w-4" />;
      case "maintenance":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Bot className="h-4 w-4" />;
    }
  };

  const handleDeviceControl = (deviceId: number, action: string) => {
    console.log(`Device ${deviceId}: ${action}`);
    // This will be connected to Supabase for real device control
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Devices</h1>
          <p className="text-muted-foreground">
            Monitor and control your robot fleet from this central dashboard
          </p>
        </div>

        {/* Device Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Devices</p>
                  <p className="text-2xl font-bold">{devices.length}</p>
                </div>
                <Bot className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-green-500">
                    {devices.filter(d => d.status === "active").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Online</p>
                  <p className="text-2xl font-bold text-primary">
                    {devices.filter(d => d.isOnline).length}
                  </p>
                </div>
                <Wifi className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Maintenance</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {devices.filter(d => d.status === "maintenance").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Devices List */}
        <div className="space-y-6">
          {devices.map((device) => (
            <Card key={device.id} className="hover:glow-primary transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Bot className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{device.name}</CardTitle>
                      <p className="text-muted-foreground">{device.type} Robot</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(device.status)} variant="secondary">
                      {getStatusIcon(device.status)}
                      <span className="ml-1 capitalize">{device.status}</span>
                    </Badge>
                    {device.isOnline && (
                      <Badge variant="outline" className="text-green-500 border-green-500">
                        <Wifi className="mr-1 h-3 w-3" />
                        Online
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Device Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{device.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Seen</p>
                      <p className="font-medium">{device.lastSeen}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Task</p>
                      <p className="font-medium">{device.tasks}</p>
                    </div>
                  </div>

                  {/* Battery & Status */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Battery Level</p>
                        <span className="text-sm font-medium">{device.battery}%</span>
                      </div>
                      <Progress value={device.battery} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Power Status</p>
                      <Switch 
                        checked={device.status === "active"}
                        onCheckedChange={() => handleDeviceControl(device.id, "toggle_power")}
                      />
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Device Controls</p>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeviceControl(device.id, "start")}
                        disabled={device.status === "maintenance"}
                      >
                        <Play className="mr-2 h-3 w-3" />
                        Start
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeviceControl(device.id, "pause")}
                        disabled={device.status !== "active"}
                      >
                        <Pause className="mr-2 h-3 w-3" />
                        Pause
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeviceControl(device.id, "reset")}
                      >
                        <RotateCcw className="mr-2 h-3 w-3" />
                        Reset
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeviceControl(device.id, "settings")}
                      >
                        <Settings className="mr-2 h-3 w-3" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {devices.length === 0 && (
          <div className="text-center py-12">
            <Bot className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Devices Found</h3>
            <p className="text-muted-foreground mb-6">
              You haven't added any robots to your fleet yet.
            </p>
            <Button variant="cta">Add Your First Device</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourDevices;