"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GlassCard } from "@/components/common/GlassCard";
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
    <GlassCard className="p-8 max-w-3xl mx-auto border-none shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] bg-background/40 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="mb-8 relative z-10">
         <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Initialize New Transmission</h2>
         <p className="text-muted-foreground">Upload your manuscript to the EbOOk database. Required fields are marked.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
        
        {/* Core Info */}
        <div className="space-y-6 bg-background/40 backdrop-blur-md p-6 rounded-xl border-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]">
           <h3 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
              <FileText className="w-5 h-5" /> Subspace Metadata
           </h3>
           <div className="space-y-2">
             <Label htmlFor="title" className="text-foreground">Protocol Title *</Label>
             <Input
               id="title"
               placeholder="e.g. Neuromancer Chronicles"
               disabled={isSubmitting}
               className="bg-background/50 border-none backdrop-blur-md text-foreground focus-visible:ring-primary shadow-sm h-12"
               {...form.register("title")}
             />
             {form.formState.errors.title && <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>}
           </div>

           <div className="space-y-2">
             <Label htmlFor="description" className="text-foreground">Synopsis / Directive *</Label>
             <textarea
               id="description"
               rows={4}
               placeholder="Describe your transmission in detail..."
               disabled={isSubmitting}
               className="w-full bg-background/50 backdrop-blur-md border-none rounded-md p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none shadow-sm"
               {...form.register("description")}
             />
             {form.formState.errors.description && <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground">Category *</Label>
                <select id="category" className="flex h-12 w-full rounded-md border-none shadow-sm bg-background/50 backdrop-blur-md px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" {...form.register("category")}>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Technology">Technology</option>
                  <option value="Programming">Programming</option>
                  <option value="Action">Action</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language" className="text-foreground">Language Protocol</Label>
                <select id="language" className="flex h-12 w-full rounded-md border-none shadow-sm bg-background/50 backdrop-blur-md px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" {...form.register("language")}>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Binary">Binary / Machine Code</option>
                </select>
              </div>
           </div>
        </div>

        {/* Pricing Segment */}
        <div className="space-y-6 bg-background/40 backdrop-blur-md p-6 rounded-xl border-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]">
           <h3 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
              <LinkIcon className="w-5 h-5" /> Economic Value
           </h3>
           <div className="space-y-2">
             <Label htmlFor="price" className="text-foreground">Price (LKR) *</Label>
             <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">Rs</span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  disabled={isSubmitting}
                  className="bg-background/50 backdrop-blur-md border-none text-foreground focus-visible:ring-primary pl-10 font-sans text-lg h-12 shadow-sm"
                  {...form.register("price")}
                />
             </div>
             {form.formState.errors.price && <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>}
           </div>
           
           <div className="bg-primary/10 border-none rounded-lg p-4 flex gap-3 text-sm text-primary shadow-sm backdrop-blur-md">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                 <p className="font-bold mb-1">Platform Fee Applied</p>
                 <p className="opacity-80">EbOOk deducts a standard 10% routing fee from all transactions. You will receive 90% of the listed price via Stripe Connect.</p>
              </div>
           </div>
        </div>

        {/* File Uploads */}
        <div className="space-y-6 bg-background/40 backdrop-blur-md p-6 rounded-xl border-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]">
           <h3 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
              <Upload className="w-5 h-5" /> Payload Data
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                 <Label className="text-foreground">Manuscript (PDF) *</Label>
                 <label htmlFor="pdf-upload" className={`flex flex-col items-center justify-center w-full h-40 border-none rounded-lg cursor-pointer transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.08)] bg-background/50 hover:bg-background/80 ${pdfFile ? 'bg-primary/10' : ''}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                       {pdfFile ? (
                          <>
                             <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
                             <p className="text-sm text-primary font-sans truncate max-w-xs">{pdfFile.name}</p>
                          </>
                       ) : (
                          <>
                             <FileText className="w-8 h-8 mb-3 text-muted-foreground" />
                             <p className="mb-2 text-sm text-muted-foreground"><span className="font-bold text-foreground">Click to select</span> or drag and drop</p>
                             <p className="text-xs text-muted-foreground">PDF files only (Max 50MB)</p>
                          </>
                       )}
                    </div>
                    <input id="pdf-upload" type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileChange(e, 'pdf')} disabled={isSubmitting} />
                 </label>
              </div>

              <div className="space-y-3">
                 <Label className="text-foreground">Cover Image</Label>
                 <label htmlFor="cover-upload" className={`flex flex-col items-center justify-center w-full h-40 border-none rounded-lg cursor-pointer transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.08)] bg-background/50 hover:bg-background/80 ${coverFile ? 'bg-primary/10' : ''}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                       {coverFile ? (
                          <>
                             <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
                             <p className="text-sm text-primary font-sans truncate max-w-xs">{coverFile.name}</p>
                          </>
                       ) : (
                          <>
                             <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                             <p className="mb-2 text-sm text-muted-foreground"><span className="font-bold text-foreground">Click to select</span> or drag and drop</p>
                             <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (Max 5MB)</p>
                          </>
                       )}
                    </div>
                    <input id="cover-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'cover')} disabled={isSubmitting} />
                 </label>
              </div>
           </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !pdfFile}
          className="w-full h-16 rounded-md bg-primary text-primary-foreground font-black text-lg tracking-widest mt-8 shadow-[0_8px_32px_0_rgba(var(--primary),0.2)] hover:opacity-90 transition-all disabled:opacity-50"
        >
          {isSubmitting ? "TRANSMITTING TO CENTRAL CORE..." : "PUBLISH MANUSCRIPT"}
        </button>
      </form>
    </GlassCard>
  );
}
