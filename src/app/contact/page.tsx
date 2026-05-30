"use client";

import React, { useState } from "react";
import { useLocale } from "@/components/layout/LocaleContext";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

type FormState = "idle" | "submitting" | "success" | "error";

const fieldLabels: Record<string, { en: string; es: string }> = {
  name: { en: "Full Name", es: "Nombre Completo" },
  company: { en: "Company", es: "Empresa" },
  email: { en: "Email Address", es: "Correo Electrónico" },
  phone: { en: "Phone Number", es: "Número de Teléfono" },
  materialType: { en: "Material Type", es: "Tipo de Material" },
  quantity: { en: "Quantity", es: "Cantidad" },
  specifications: { en: "Technical Specifications", es: "Especificaciones Técnicas" },
  deliveryLocation: { en: "Delivery Location", es: "Ubicación de Entrega" },
  message: { en: "Additional Message", es: "Mensaje Adicional" },
};

const materialOptions = [
  { en: "Carbon Steel Pipe", es: "Tubería de Acero al Carbono" },
  { en: "Alloy Pipe", es: "Tubería de Aleación" },
  { en: "Stainless Steel Pipe", es: "Tubería de Acero Inoxidable" },
  { en: "Fittings", es: "Conexiones" },
  { en: "Flanges", es: "Bridas" },
  { en: "Valves", es: "Válvulas" },
  { en: "Other", es: "Otro" },
];

export default function ContactPage() {
  const { locale } = useLocale();
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState<Record<string, string>>({});

  const label = (field: string) => fieldLabels[field]?.[locale] || field;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState("success");
        setFormData({});
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <>
      <PageHero
        title={locale === "en" ? "Contact Us" : "Contáctenos"}
        subtitle={locale === "en" ? "Get in touch with Steel Eagle Supply. Submit a B2B quote request or consult with our technical team." : "Póngase en contacto con Steel Eagle Supply. Envíe una solicitud de cotización B2B o consulte con nuestro equipo técnico."}
        breadcrumbs={[{ label: "Contact", label_es: "Contacto" }]}
        backgroundImage="/images/sections/contact-cta-bg.webp"
        backgroundAlt="Industrial supply office consultation"
      />

      <SectionWrapper id="contact-form-section" bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-extrabold text-primary mb-6">
              {locale === "en" ? "Request a Quote" : "Solicitar Cotización"}
            </h2>

            {formState === "success" && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium animate-fade-in">
                {locale === "en" ? "✓ Your request has been submitted. Our team will contact you shortly." : "✓ Su solicitud ha sido enviada. Nuestro equipo se comunicará con usted pronto."}
              </div>
            )}
            {formState === "error" && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-medium animate-fade-in">
                {locale === "en" ? "There was an error submitting your request. Please try again." : "Hubo un error al enviar su solicitud. Intente de nuevo."}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField name="name" label={label("name")} required value={formData.name || ""} onChange={handleChange} />
                <FormField name="company" label={label("company")} required value={formData.company || ""} onChange={handleChange} />
                <FormField name="email" label={label("email")} type="email" required value={formData.email || ""} onChange={handleChange} />
                <FormField name="phone" label={label("phone")} type="tel" value={formData.phone || ""} onChange={handleChange} />
              </div>

              {/* Material Type select */}
              <div>
                <label htmlFor="materialType" className="block text-sm font-semibold text-primary mb-1.5">{label("materialType")}</label>
                <select id="materialType" name="materialType" value={formData.materialType || ""} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all duration-200">
                  <option value="">{locale === "en" ? "Select..." : "Seleccionar..."}</option>
                  {materialOptions.map((opt, i) => (
                    <option key={i} value={opt.en}>{locale === "en" ? opt.en : opt.es}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField name="quantity" label={label("quantity")} value={formData.quantity || ""} onChange={handleChange} />
                <FormField name="deliveryLocation" label={label("deliveryLocation")} value={formData.deliveryLocation || ""} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="specifications" className="block text-sm font-semibold text-primary mb-1.5">{label("specifications")}</label>
                <textarea id="specifications" name="specifications" rows={3} value={formData.specifications || ""} onChange={handleChange} placeholder={locale === "en" ? "Grades, sizes, wall thickness, standards..." : "Grados, tamaños, espesor de pared, normas..."} className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all duration-200 resize-y" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-primary mb-1.5">{label("message")}</label>
                <textarea id="message" name="message" rows={4} value={formData.message || ""} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all duration-200 resize-y" />
              </div>

              <button type="submit" disabled={formState === "submitting"} className="inline-flex items-center justify-center px-8 py-3.5 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-sm tracking-wide shadow-sm hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed">
                {formState === "submitting"
                  ? (locale === "en" ? "Sending..." : "Enviando...")
                  : (locale === "en" ? "Submit Request" : "Enviar Solicitud")}
              </button>
            </form>
          </div>

          {/* Sidebar info */}
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">
                {locale === "en" ? "Contact Information" : "Información de Contacto"}
              </h3>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href="mailto:sales@steeleaglesupply.com" className="hover:text-secondary transition-colors">sales@steeleaglesupply.com</a>
                </li>
                <li className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>{locale === "en" ? "Houston, TX / Latin America Operations" : "Houston, TX / Operaciones Latinoamérica"}</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary to-slate-900 rounded-xl p-6 text-white">
              <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-3">
                {locale === "en" ? "Response Time" : "Tiempo de Respuesta"}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {locale === "en"
                  ? "Our team responds to quote requests within 24 business hours. For urgent technical inquiries, email us directly."
                  : "Nuestro equipo responde solicitudes de cotización dentro de 24 horas hábiles. Para consultas técnicas urgentes, envíenos un correo directamente."}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

/* Reusable form field */
function FormField({ name, label, type = "text", required = false, value, onChange }: {
  name: string; label: string; type?: string; required?: boolean;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-primary mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input id={name} name={name} type={type} required={required} value={value} onChange={onChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all duration-200" />
    </div>
  );
}
