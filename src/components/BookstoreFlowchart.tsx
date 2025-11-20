import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FlowchartNode } from "./FlowchartNode";
import { FlowchartArrow } from "./FlowchartArrow";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, SkipForward, Download, FileImage, FileText, Image } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type FlowStep = {
  id: string;
  title: string;
  description: string;
  type: "start" | "end" | "activity" | "decision" | "system";
  delay: number;
};

const flowSteps: FlowStep[] = [
  {
    id: "start",
    title: "START",
    description: "Customer begins their shopping journey either by entering the physical store or accessing the online platform.",
    type: "start",
    delay: 0.1
  },
  {
    id: "enter",
    title: "Customer Enters Store / Accesses Online Store",
    description: "The initial touchpoint where customers engage with the bookstore through physical or digital channels.",
    type: "activity",
    delay: 0.2
  },
  {
    id: "browse",
    title: "Browse Books",
    description: "Customer explores available books through in-store browsing or online inventory search functionality.",
    type: "activity",
    delay: 0.3
  },
  {
    id: "findBook",
    title: "Find a book?",
    description: "Decision point: Has the customer found a book they want to purchase?",
    type: "decision",
    delay: 0.4
  },
  {
    id: "restock",
    title: "Place Online Order / Request Restock",
    description: "Alternative path for customers who don't find what they're looking for - option to place special orders or request restocking.",
    type: "activity",
    delay: 0.5
  },
  {
    id: "addCart",
    title: "Add book(s) to Cart",
    description: "Customer adds selected book(s) to their shopping cart, either physical collection or digital cart.",
    type: "activity",
    delay: 0.5
  },
  {
    id: "calculate",
    title: "POS System Automatically Calculates Total",
    description: "Point-of-sale system automatically computes the total cost including taxes and applicable discounts.",
    type: "system",
    delay: 0.6
  },
  {
    id: "payment",
    title: "Select Payment Method",
    description: "Customer chooses their preferred payment method for the transaction.",
    type: "decision",
    delay: 0.7
  },
  {
    id: "cashPay",
    title: "Customer Pays in Cash",
    description: "Traditional cash payment processing for in-store transactions.",
    type: "activity",
    delay: 0.8
  },
  {
    id: "digitalPay",
    title: "Customer Pays Digitally",
    description: "Modern payment methods including credit/debit cards and mobile payment solutions.",
    type: "activity",
    delay: 0.8
  },
  {
    id: "updateSystem",
    title: "POS System Updates Sales + Inventory",
    description: "Real-time system updates to maintain accurate sales records and inventory levels.",
    type: "system",
    delay: 0.9
  },
  {
    id: "receipt",
    title: "Issue Digital/Printed Receipt",
    description: "Generation and delivery of transaction receipt in digital or printed format.",
    type: "activity",
    delay: 1.0
  },
  {
    id: "delivery",
    title: "Customer Receives Books",
    description: "Final step where customer receives their purchased books, with delivery options for online orders.",
    type: "activity",
    delay: 1.1
  },
  {
    id: "end",
    title: "TRANSACTION COMPLETE",
    description: "Successful completion of the entire transaction process.",
    type: "end",
    delay: 1.2
  }
];

export function BookstoreFlowchart() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [highlightedPath, setHighlightedPath] = useState<Set<string>>(new Set());
  const [walkthroughMode, setWalkthroughMode] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const flowchartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && walkthroughMode) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < flowSteps.length - 1) {
            const nextStep = prev + 1;
            const stepId = flowSteps[nextStep].id;
            setActiveNode(stepId);
            setCompletedSteps(completed => new Set([...completed, flowSteps[prev].id]));
            updateHighlightedPath(stepId);
            return nextStep;
          } else {
            setIsPlaying(false);
            setCompletedSteps(completed => new Set([...completed, flowSteps[prev].id]));
            return prev;
          }
        });
      }, 2000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, walkthroughMode]);

  const updateHighlightedPath = (stepId: string) => {
    const stepIndex = flowSteps.findIndex(step => step.id === stepId);
    const pathSteps = flowSteps.slice(0, stepIndex + 1).map(step => step.id);
    setHighlightedPath(new Set(pathSteps));
  };

  const startWalkthrough = () => {
    setWalkthroughMode(true);
    setIsPlaying(true);
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setHighlightedPath(new Set());
    setActiveNode(flowSteps[0].id);
  };

  const pauseWalkthrough = () => {
    setIsPlaying(!isPlaying);
  };

  const resetWalkthrough = () => {
    setWalkthroughMode(false);
    setIsPlaying(false);
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setHighlightedPath(new Set());
    setActiveNode(null);
  };

  const nextStep = () => {
    if (currentStep < flowSteps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      const stepId = flowSteps[nextStepIndex].id;
      setActiveNode(stepId);
      setCompletedSteps(completed => new Set([...completed, flowSteps[currentStep].id]));
      updateHighlightedPath(stepId);
    }
  };

  const handleNodeClick = (nodeId: string) => {
    if (!walkthroughMode) {
      setActiveNode(nodeId);
      const step = flowSteps.find(s => s.id === nodeId);
      if (step) {
        updateHighlightedPath(nodeId);
      }
    }
  };

  const isNodeActive = (nodeId: string) => walkthroughMode ? activeNode === nodeId : false;
  const isNodeCompleted = (nodeId: string) => completedSteps.has(nodeId);
  const isNodeHighlighted = (nodeId: string) => highlightedPath.has(nodeId);
  const isArrowHighlighted = (fromStep: string, toStep: string) => {
    return highlightedPath.has(fromStep) && highlightedPath.has(toStep);
  };

  // Download Functions - Now properly inside component scope
  const downloadAsPNG = async () => {
    if (!flowchartRef.current) return;
    
    setIsDownloading(true);
    try {
      // Temporarily disable animations and hide side panel for cleaner export
      const sidePanel = document.querySelector('.w-80');
      const originalDisplay = sidePanel ? (sidePanel as HTMLElement).style.display : '';
      if (sidePanel) (sidePanel as HTMLElement).style.display = 'none';

      const canvas = await html2canvas(flowchartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 1200,
        height: 1600,
      });

      // Restore side panel
      if (sidePanel) (sidePanel as HTMLElement).style.display = originalDisplay;

      const link = document.createElement('a');
      link.download = 'bookstore-process-flowchart.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsPDF = async () => {
    if (!flowchartRef.current) return;
    
    setIsDownloading(true);
    try {
      // Temporarily hide side panel for cleaner export
      const sidePanel = document.querySelector('.w-80');
      const originalDisplay = sidePanel ? (sidePanel as HTMLElement).style.display : '';
      if (sidePanel) (sidePanel as HTMLElement).style.display = 'none';

      const canvas = await html2canvas(flowchartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 1200,
        height: 1600,
      });

      // Restore side panel
      if (sidePanel) (sidePanel as HTMLElement).style.display = originalDisplay;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 190;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      // Add title
      pdf.setFontSize(16);
      pdf.text('Bookstore Transaction Process Flow', 105, 15, { align: 'center' });
      position = 25;

      // Add image
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - position;

      // Add new pages if content is too tall
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('bookstore-process-flowchart.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsSVG = () => {
    setIsDownloading(true);
    try {
      // Create SVG content
      const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200">
  <rect width="100%" height="100%" fill="white"/>
  <text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#030213">
    Bookstore Transaction Process Flow
  </text>
  <text x="400" y="50" text-anchor="middle" font-size="12" fill="#717182">
    Interactive process visualization - "To Be" Process
  </text>
</svg>`;

      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'bookstore-process-flowchart.svg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating SVG:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const exportFlowchartData = () => {
    const data = {
      title: "Bookstore Transaction Process Flow",
      description: "Interactive 'to be' process for customer transactions in physical and online bookstore environments",
      steps: flowSteps,
      exportDate: new Date().toISOString(),
      version: "1.0"
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'bookstore-process-flowchart-data.json';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4">Bookstore Transaction Process Flow</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            This interactive flowchart represents the ideal "to be" process for customer transactions in both physical and online bookstore environments.
          </p>
          
          {/* Controls */}
          <motion.div 
            className="flex justify-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Button 
              onClick={startWalkthrough} 
              disabled={walkthroughMode && isPlaying}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Walkthrough
            </Button>
            <Button 
              onClick={pauseWalkthrough} 
              disabled={!walkthroughMode}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Resume'}
            </Button>
            <Button 
              onClick={nextStep} 
              disabled={!walkthroughMode || isPlaying || currentStep >= flowSteps.length - 1}
              variant="outline"
              className="flex items-center gap-2"
            >
              <SkipForward className="w-4 h-4" />
              Next Step
            </Button>
            <Button 
              onClick={resetWalkthrough} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            
            {/* Download Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  disabled={isDownloading}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {isDownloading ? 'Exporting...' : 'Export'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={downloadAsPNG} className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Download as PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadAsPDF} className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Download as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadAsSVG} className="flex items-center gap-2">
                  <FileImage className="w-4 h-4" />
                  Download as SVG
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={exportFlowchartData} className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Export Data (JSON)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          {walkthroughMode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-md mx-auto"
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">
                  Step {currentStep + 1} of {flowSteps.length}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {Math.round(((currentStep + 1) / flowSteps.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-blue-500 h-2 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / flowSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="flex gap-8">
          {/* Main Flowchart */}
          <div className="flex-1" ref={flowchartRef}>
            <div className="flex flex-col items-center space-y-4">
              {/* Start */}
              <FlowchartNode 
                type="start"
                onClick={() => handleNodeClick("start")}
                isActive={isNodeActive("start")}
                isCompleted={isNodeCompleted("start")}
                isHighlighted={isNodeHighlighted("start")}
                delay={0.1}
              >
                START
              </FlowchartNode>

              <FlowchartArrow 
                isAnimated={isArrowHighlighted("start", "enter")}
                isHighlighted={isArrowHighlighted("start", "enter")}
                delay={0.15}
              />

              {/* Customer Enters */}
              <FlowchartNode 
                type="activity"
                onClick={() => handleNodeClick("enter")}
                isActive={isNodeActive("enter")}
                isCompleted={isNodeCompleted("enter")}
                isHighlighted={isNodeHighlighted("enter")}
                delay={0.2}
                className="min-w-80"
              >
                Customer Enters Store /<br />Accesses Online Store
              </FlowchartNode>

              <FlowchartArrow 
                isAnimated={isArrowHighlighted("enter", "browse")}
                isHighlighted={isArrowHighlighted("enter", "browse")}
                delay={0.25}
              />

              {/* Browse Books */}
              <FlowchartNode 
                type="activity"
                onClick={() => handleNodeClick("browse")}
                isActive={isNodeActive("browse")}
                isCompleted={isNodeCompleted("browse")}
                isHighlighted={isNodeHighlighted("browse")}
                delay={0.3}
                className="min-w-80"
              >
                Browse Books<br />(in-store shelves or online inventory search)
              </FlowchartNode>

              <FlowchartArrow 
                isAnimated={isArrowHighlighted("browse", "findBook")}
                isHighlighted={isArrowHighlighted("browse", "findBook")}
                delay={0.35}
              />

              {/* Find Book Decision */}
              <FlowchartNode 
                type="decision"
                onClick={() => handleNodeClick("findBook")}
                isActive={isNodeActive("findBook")}
                isCompleted={isNodeCompleted("findBook")}
                isHighlighted={isNodeHighlighted("findBook")}
                delay={0.4}
                className="w-40 h-40"
              >
                Find a<br />book?
              </FlowchartNode>

              {/* Decision branches */}
              <div className="flex items-center justify-center w-full space-x-8">
                {/* No branch */}
                <div className="flex flex-col items-center space-y-4">
                  <FlowchartArrow 
                    direction="left" 
                    label="No" 
                    isAnimated={isArrowHighlighted("findBook", "restock")}
                    isHighlighted={isArrowHighlighted("findBook", "restock")}
                    delay={0.45}
                  />
                  <FlowchartNode 
                    type="activity"
                    onClick={() => handleNodeClick("restock")}
                    isActive={isNodeActive("restock")}
                    isCompleted={isNodeCompleted("restock")}
                    isHighlighted={isNodeHighlighted("restock")}
                    delay={0.5}
                    className="min-w-64"
                  >
                    Place Online Order /<br />Request Restock
                  </FlowchartNode>
                </div>

                {/* Yes branch */}
                <div className="flex flex-col items-center space-y-4">
                  <FlowchartArrow 
                    direction="right" 
                    label="Yes" 
                    isAnimated={isArrowHighlighted("findBook", "addCart")}
                    isHighlighted={isArrowHighlighted("findBook", "addCart")}
                    delay={0.45}
                  />
                  <div className="opacity-0">placeholder</div>
                </div>
              </div>

              {/* Continue main flow */}
              <FlowchartNode 
                type="activity"
                onClick={() => handleNodeClick("addCart")}
                isActive={isNodeActive("addCart")}
                isCompleted={isNodeCompleted("addCart")}
                isHighlighted={isNodeHighlighted("addCart")}
                delay={0.5}
                className="min-w-80"
              >
                Add book(s) to Cart<br />(physical or digital checkout)
              </FlowchartNode>

              <FlowchartArrow 
                isAnimated={isArrowHighlighted("addCart", "calculate")}
                isHighlighted={isArrowHighlighted("addCart", "calculate")}
                delay={0.55}
              />

              {/* POS Calculate */}
              <FlowchartNode 
                type="system"
                onClick={() => handleNodeClick("calculate")}
                isActive={isNodeActive("calculate")}
                isCompleted={isNodeCompleted("calculate")}
                isHighlighted={isNodeHighlighted("calculate")}
                delay={0.6}
                className="min-w-80"
              >
                POS System Automatically<br />Calculates Total
              </FlowchartNode>

              <FlowchartArrow 
                isAnimated={isArrowHighlighted("calculate", "payment")}
                isHighlighted={isArrowHighlighted("calculate", "payment")}
                delay={0.65}
              />

              {/* Payment Method Decision */}
              <FlowchartNode 
                type="decision"
                onClick={() => handleNodeClick("payment")}
                isActive={isNodeActive("payment")}
                isCompleted={isNodeCompleted("payment")}
                isHighlighted={isNodeHighlighted("payment")}
                delay={0.7}
                className="w-40 h-40"
              >
                Select<br />Payment<br />Method
              </FlowchartNode>

              {/* Payment branches */}
              <div className="flex items-center justify-center w-full space-x-16">
                {/* Cash branch */}
                <div className="flex flex-col items-center space-y-4">
                  <FlowchartArrow 
                    direction="left" 
                    label="Cash" 
                    isAnimated={isArrowHighlighted("payment", "cashPay")}
                    isHighlighted={isArrowHighlighted("payment", "cashPay")}
                    delay={0.75}
                  />
                  <FlowchartNode 
                    type="activity"
                    onClick={() => handleNodeClick("cashPay")}
                    isActive={isNodeActive("cashPay")}
                    isCompleted={isNodeCompleted("cashPay")}
                    isHighlighted={isNodeHighlighted("cashPay")}
                    delay={0.8}
                    className="min-w-48"
                  >
                    Customer Pays<br />in Cash
                  </FlowchartNode>
                </div>

                {/* Digital branch */}
                <div className="flex flex-col items-center space-y-4">
                  <FlowchartArrow 
                    direction="right" 
                    label="Card/Mobile" 
                    isAnimated={isArrowHighlighted("payment", "digitalPay")}
                    isHighlighted={isArrowHighlighted("payment", "digitalPay")}
                    delay={0.75}
                  />
                  <FlowchartNode 
                    type="activity"
                    onClick={() => handleNodeClick("digitalPay")}
                    isActive={isNodeActive("digitalPay")}
                    isCompleted={isNodeCompleted("digitalPay")}
                    isHighlighted={isNodeHighlighted("digitalPay")}
                    delay={0.8}
                    className="min-w-48"
                  >
                    Customer Pays<br />Digitally
                  </FlowchartNode>
                </div>
              </div>

              <FlowchartArrow 
                className="mt-8" 
                isAnimated={isArrowHighlighted("digitalPay", "updateSystem") || isArrowHighlighted("cashPay", "updateSystem")}
                isHighlighted={isArrowHighlighted("digitalPay", "updateSystem") || isArrowHighlighted("cashPay", "updateSystem")}
                delay={0.85}
              />

              {/* Update System */}
              <FlowchartNode 
                type="system"
                onClick={() => handleNodeClick("updateSystem")}
                isActive={isNodeActive("updateSystem")}
                isCompleted={isNodeCompleted("updateSystem")}
                isHighlighted={isNodeHighlighted("updateSystem")}
                delay={0.9}
                className="min-w-80"
              >
                POS System Updates Sales +<br />Inventory in Real Time
              </FlowchartNode>

              <FlowchartArrow 
                isAnimated={isArrowHighlighted("updateSystem", "receipt")}
                isHighlighted={isArrowHighlighted("updateSystem", "receipt")}
                delay={0.95}
              />

              {/* Issue Receipt */}
              <FlowchartNode 
                type="activity"
                onClick={() => handleNodeClick("receipt")}
                isActive={isNodeActive("receipt")}
                isCompleted={isNodeCompleted("receipt")}
                isHighlighted={isNodeHighlighted("receipt")}
                delay={1.0}
                className="min-w-80"
              >
                Clerk (or System) Issues<br />Digital/Printed Receipt
              </FlowchartNode>

              <FlowchartArrow 
                isAnimated={isArrowHighlighted("receipt", "delivery")}
                isHighlighted={isArrowHighlighted("receipt", "delivery")}
                delay={1.05}
              />

              {/* Customer Receives */}
              <FlowchartNode 
                type="activity"
                onClick={() => handleNodeClick("delivery")}
                isActive={isNodeActive("delivery")}
                isCompleted={isNodeCompleted("delivery")}
                isHighlighted={isNodeHighlighted("delivery")}
                delay={1.1}
                className="min-w-80"
              >
                Customer Receives Books<br />(with optional delivery for online orders)
              </FlowchartNode>

              <FlowchartArrow 
                isAnimated={isArrowHighlighted("delivery", "end")}
                isHighlighted={isArrowHighlighted("delivery", "end")}
                delay={1.15}
              />

              {/* End */}
              <FlowchartNode 
                type="end"
                onClick={() => handleNodeClick("end")}
                isActive={isNodeActive("end")}
                isCompleted={isNodeCompleted("end")}
                isHighlighted={isNodeHighlighted("end")}
                delay={1.2}
              >
                TRANSACTION COMPLETE
              </FlowchartNode>
            </div>
          </div>

          {/* Information Panel */}
          <div className="w-80">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Process Information
                  <Badge variant="outline">Interactive</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {activeNode ? (
                    <motion.div 
                      key={activeNode}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="mb-2">Current Step:</h4>
                        <Badge className="capitalize">
                          {flowSteps.find(step => step.id === activeNode)?.title || activeNode}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="mb-2">Description:</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {flowSteps.find(step => step.id === activeNode)?.description || 
                           "Click on any flowchart element to see its description."}
                        </p>
                      </div>
                      {walkthroughMode && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          <h4 className="mb-2 text-blue-700">Walkthrough Mode</h4>
                          <p className="text-sm text-blue-600">
                            {isPlaying ? 'Automatically advancing through steps...' : 'Paused - use controls to continue'}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-muted-foreground"
                    >
                      <p className="mb-4">Click on any flowchart element to learn more, or start the interactive walkthrough to see the complete process flow.</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-primary rounded-full"></div>
                          <span>Start/End Points</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-card border border-border"></div>
                          <span>Activities</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-accent border border-border transform rotate-45"></div>
                          <span>Decisions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-secondary" style={{ clipPath: "polygon(0 0, 80% 0, 100% 100%, 20% 100%)" }}></div>
                          <span>System Activities</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}