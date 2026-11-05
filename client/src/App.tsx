import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Features from "@/pages/features";
import About from "@/pages/about";
import PrivacyPolicy from "@/pages/privacy-policy";
import Disclaimer from "@/pages/disclaimer";
import TermsConditions from "@/pages/terms-conditions";
import Dmca from "@/pages/dmca";
import Contact from "@/pages/contact";
import Blog from "@/pages/blog";
import ArticlePage from "@/pages/article";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/features" component={Features} />
      <Route path="/about" component={About} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/terms-conditions" component={TermsConditions} />
      <Route path="/dmca" component={Dmca} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={ArticlePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
