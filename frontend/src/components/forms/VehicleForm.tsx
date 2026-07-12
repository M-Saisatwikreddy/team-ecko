import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";

const schema = (existing: string[]) => z.object({
  registrationNumber: z.string().trim().min(4, "Required").refine((v) => !existing.includes(v.toUpperCase()), "Registration number must be unique"),
  name: z.string().trim().min(2, "Required"),
  type: z.string().min(1, "Required"),
  capacityKg: z.coerce.number().positive("Must be > 0"),
  odometer: z.coerce.number().min(0),
  acquisitionCost: z.coerce.number().min(0),
  status: z.enum(["Available", "On Trip", "In Shop", "Retired"]),
});
type Values = z.infer<ReturnType<typeof schema>>;

export function VehicleForm({
  existingReg = [], onSubmit,
}: { existingReg?: string[]; onSubmit: (v: Values) => void }) {
  const form = useForm<Values>({
    resolver: zodResolver(schema(existingReg.map((r) => r.toUpperCase()))),
    defaultValues: {
      registrationNumber: "", name: "", type: "Medium Truck",
      capacityKg: 0, odometer: 0, acquisitionCost: 0, status: "Available",
    },
  });
  const err = form.formState.errors;

  return (
    <form className="grid grid-cols-1 gap-3 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="sm:col-span-2 flex flex-col gap-1.5">
        <Label>Registration Number</Label>
        <Input placeholder="MH-01-AB-1234" {...form.register("registrationNumber")} />
        {err.registrationNumber && <p className="text-xs text-destructive">{err.registrationNumber.message}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Vehicle Name</Label>
        <Input {...form.register("name")} />
        {err.name && <p className="text-xs text-destructive">{err.name.message}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Type</Label>
        <Select defaultValue={form.getValues("type")} onValueChange={(v) => form.setValue("type", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {["Mini Truck", "Light Truck", "Medium Truck", "Heavy Truck", "Tanker", "Trailer"].map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Capacity (kg)</Label>
        <Input type="number" {...form.register("capacityKg")} />
        {err.capacityKg && <p className="text-xs text-destructive">{err.capacityKg.message}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Odometer (km)</Label>
        <Input type="number" {...form.register("odometer")} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Acquisition Cost (INR)</Label>
        <Input type="number" {...form.register("acquisitionCost")} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Status</Label>
        <Select defaultValue={form.getValues("status")} onValueChange={(v) => form.setValue("status", v as Values["status"])}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {["Available", "On Trip", "In Shop", "Retired"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
        <Button type="submit">Save Vehicle</Button>
      </div>
    </form>
  );
}
