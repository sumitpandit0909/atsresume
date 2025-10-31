import { useState } from "react";
import { Download, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ExportControlsProps {
  onExport: (format: "pdf" | "docx") => void;
  isExporting: boolean;
}

export function ExportControls({ onExport, isExporting }: ExportControlsProps) {
  const [format, setFormat] = useState<"pdf" | "docx">("pdf");

  return (
    <div className="sticky bottom-0 bg-card border-t border-card-border p-6 rounded-t-lg" data-testid="export-controls">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-card-foreground">
            Export Optimized Resume
          </h3>
        </div>

        <RadioGroup value={format} onValueChange={(v) => setFormat(v as "pdf" | "docx")} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pdf" id="pdf" data-testid="radio-pdf" />
            <Label htmlFor="pdf" className="cursor-pointer text-sm font-medium">
              PDF
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="docx" id="docx" data-testid="radio-docx" />
            <Label htmlFor="docx" className="cursor-pointer text-sm font-medium">
              DOCX
            </Label>
          </div>
        </RadioGroup>

        <Button
          size="lg"
          onClick={() => onExport(format)}
          disabled={isExporting}
          className="w-full"
          data-testid="button-export"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? "Generating..." : "Export Resume"}
        </Button>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-4 h-4" />
          <p>Generated locally - no data uploaded</p>
        </div>
      </div>
    </div>
  );
}
