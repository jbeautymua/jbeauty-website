"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";
import { updateBusinessInfo } from "@/lib/admin-actions";
import type { Database } from "@/types/database";

type BusinessInfo = Database["public"]["Tables"]["business_info"]["Row"];

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Props {
  data: BusinessInfo;
}

export default function BusinessInfoForm({ data }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState(data.name);
  const [phone, setPhone] = useState(data.phone);
  const [phoneDisplay, setPhoneDisplay] = useState(data.phone_display);
  const [email, setEmail] = useState(data.email);
  const [instagram, setInstagram] = useState(data.instagram);
  const [instagramHandle, setInstagramHandle] = useState(data.instagram_handle);
  const [whatsapp, setWhatsapp] = useState(data.whatsapp);
  const [treatwell, setTreatwell] = useState(data.treatwell);
  const [location, setLocation] = useState(data.location);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(data.google_maps_url);
  const [hours, setHours] = useState<Record<string, string>>(data.hours);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await updateBusinessInfo({
        name, phone, phone_display: phoneDisplay, email,
        instagram, instagram_handle: instagramHandle,
        whatsapp, treatwell, location, google_maps_url: googleMapsUrl,
        hours,
      });
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const updateHour = (day: string, value: string) => {
    setHours((prev) => ({ ...prev, [day]: value }));
  };

  const inputClass =
    "w-full rounded-lg border border-border px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition";

  return (
    <div className="bg-white rounded-lg border border-border/50 shadow-sm p-6 max-w-2xl">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Business Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Phone (link)</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Phone (display)</label>
            <input value={phoneDisplay} onChange={(e) => setPhoneDisplay(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Instagram URL</label>
            <input value={instagram} onChange={(e) => setInstagram(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Instagram Handle</label>
            <input value={instagramHandle} onChange={(e) => setInstagramHandle(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">WhatsApp</label>
            <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Treatwell</label>
            <input value={treatwell} onChange={(e) => setTreatwell(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Google Maps URL</label>
          <input value={googleMapsUrl} onChange={(e) => setGoogleMapsUrl(e.target.value)} className={inputClass} />
        </div>

        {/* Opening Hours */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Opening Hours</label>
          <div className="space-y-2">
            {DAY_ORDER.map((day) => (
              <div key={day} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-24 shrink-0">{day}</span>
                <input
                  value={hours[day] ?? ""}
                  onChange={(e) => updateHour(day, e.target.value)}
                  placeholder="e.g. 9:00 AM - 6:00 PM or Closed"
                  className="flex-1 rounded-lg border border-border px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              Saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
