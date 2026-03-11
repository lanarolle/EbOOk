"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GlassCard } from "@/components/common/GlassCard";
import { NeonButton } from "@/components/common/NeonButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, PlusCircle, Link as LinkIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const bookUploadSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Price must be a valid positive number"),
  category: z.string().min(1, "Please select a category"),
  language: z.string().optional(),
});

type BookUploadFormValues = z.infer<typeof bookUploadSchema>;

export function BookUploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  
  const form = useForm<BookUploadFormValues>({
    resolver: zodResolver(bookUploadSchema),
    defaultValues: { title: "", description: "", price: "", category: "Sci-Fi", language: "English" },
  });

  const onSubmit = async (data: BookUploadFormValues) => {
    setIsSubmitting(true);
    // Mock upload logic
    await new Promise(res => setTimeout(res, 2000));
    setIsSubmitting(false);
    alert("Protocol transmission successful! Your manuscript is now live.");
    form.reset();
    setPdfFile(null);
    setCoverFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'cover') => {
     if (e.target.files && e.target.files[0]) {
        if (type === 'pdf') setPdfFile(e.target.files[0]);
        if (type === 'cover') setCoverFile(e.target.files[0]);
     }
  };

  return (
    <GlassCard className="p-8 max-w-3xl mx-auto border-t-4 border-neon-cyan relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="mb-8 relative z-10">
         <h2 className="text-3xl font-orbitron font-bold text-white mb-2">Initialize New Transmission</h2>
         <p className="text-text-muted">Upload your manuscript to the AntiGravity database. Required fields are marked.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
        
        {/* Core Info */}
        <div className="space-y-6 bg-bg-void/50 p-6 rounded-xl border border-white/5">
           <h3 className="text-xl font-orbitron font-bold text-neon-cyan flex items-center gap-2">
              <FileText className="w-5 h-5" /> Subspace Metadata
           </h3>
           <div className="space-y-2">
             <Label htmlFor="title" className="text-text-primary">Protocol Title *</Label>
             <Input
               id="title"
               placeholder="e.g. Neuromancer Chronicles"
               disabled={isSubmitting}
               className="bg-bg-void border-white/10 text-white focus-visible:ring-neon-cyan h-12"
               {...form.register("title")}
             />
             {form.formState.errors.title && <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>}
           </div>

           <div className="space-y-2">
             <Label htmlFor="description" className="text-text-primary">Synopsis / Directive *</Label>
             <textarea
               id="description"
               rows={4}
               placeholder="Describe your transmission in detail..."
               disabled={isSubmitting}
               className="w-full bg-bg-void border border-white/10 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan resize-none"
               {...form.register("description")}
             />
             {form.formState.errors.description && <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-text-primary">Category *</Label>
                <select id="category" className="flex h-12 w-full rounded-md border border-white/10 bg-bg-void px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan" {...form.register("category")}>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Technology">Technology</option>
                  <option value="Programming">Programming</option>
                  <option value="Action">Action</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language" className="text-text-primary">Language Protocol</Label>
                <select id="language" className="flex h-12 w-full rounded-md border border-white/10 bg-bg-void px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan" {...form.register("language")}>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Binary">Binary / Machine Code</option>
                </select>
              </div>
           </div>
        </div>

        {/* Pricing Segment */}
        <div className="space-y-6 bg-bg-void/50 p-6 rounded-xl border border-white/5">
           <h3 className="text-xl font-orbitron font-bold text-neon-gold flex items-center gap-2">
              <LinkIcon className="w-5 h-5" /> Economic Value
           </h3>
           <div className="space-y-2">
             <Label htmlFor="price" className="text-text-primary">Price (USD) *</Label>
             <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-bold">$</span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  disabled={isSubmitting}
                  className="bg-bg-void border-white/10 text-white focus-visible:ring-neon-gold pl-8 font-mono text-lg h-12"
                  {...form.register("price")}
                />
             </div>
             {form.formState.errors.price && <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>}
           </div>
           
           <div className="bg-neon-gold/5 border border-neon-gold/20 rounded p-4 flex gap-3 text-sm text-neon-gold">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                 <p className="font-bold mb-1">Platform Fee Applied</p>
                 <p className="opacity-80">AntiGravity deducts a standard 10% routing fee from all transactions. You will receive 90% of the listed price via Stripe Connect.</p>
              </div>
           </div>
        </div>

        {/* File Uploads */}
        <div className="space-y-6 bg-bg-void/50 p-6 rounded-xl border border-white/5">
           <h3 className="text-xl font-orbitron font-bold text-neon-purple flex items-center gap-2">
              <Upload className="w-5 h-5" /> Payload Data
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                 <Label className="text-text-primary">Manuscript (PDF) *</Label>
                 <label htmlFor="pdf-upload" className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all ${pdfFile ? 'border-neon-cyan bg-neon-cyan/5' : 'border-white/20 hover:bg-white/5 hover:border-white/40'}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                       {pdfFile ? (
                          <>
                             <CheckCircle2 className="w-8 h-8 text-neon-cyan mb-2" />
                             <p className="text-sm text-neon-cyan font-mono truncate max-w-xs">{pdfFile.name}</p>
                          </>
                       ) : (
                          <>
                             <FileText className="w-8 h-8 mb-3 text-text-muted" />
                             <p className="mb-2 text-sm text-text-muted"><span className="font-bold text-white">Click to select</span> or drag and drop</p>
                             <p className="text-xs text-text-muted">PDF files only (Max 50MB)</p>
                          </>
                       )}
                    </div>
                    <input id="pdf-upload" type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileChange(e, 'pdf')} disabled={isSubmitting} />
                 </label>
              </div>

              <div className="space-y-3">
                 <Label className="text-text-primary">Cover Image</Label>
                 <label htmlFor="cover-upload" className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all ${coverFile ? 'border-neon-purple bg-neon-purple/5' : 'border-white/20 hover:bg-white/5 hover:border-white/40'}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                       {coverFile ? (
                          <>
                             <CheckCircle2 className="w-8 h-8 text-neon-purple mb-2" />
                             <p className="text-sm text-neon-purple font-mono truncate max-w-xs">{coverFile.name}</p>
                          </>
                       ) : (
                          <>
                             <Upload className="w-8 h-8 mb-3 text-text-muted" />
                             <p className="mb-2 text-sm text-text-muted"><span className="font-bold text-white">Click to select</span> or drag and drop</p>
                             <p className="text-xs text-text-muted">PNG, JPG, WEBP (Max 5MB)</p>
                          </>
                       )}
                    </div>
                    <input id="cover-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'cover')} disabled={isSubmitting} />
                 </label>
              </div>
           </div>
        </div>

        <NeonButton
          type="submit"
          disabled={isSubmitting || !pdfFile}
          className="w-full h-16 text-lg tracking-widest mt-8 font-black"
          neonVariant="primary"
        >
          {isSubmitting ? "TRANSMITTING TO CENTRAL CORE..." : "PUBLISH MANUSCRIPT"}
        </NeonButton>
      </form>
    </GlassCard>
  );
}
