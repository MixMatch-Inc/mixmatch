import BookingForm from "@/components/booking/BookingForm";

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Book Your Event</h1>
      <div className="max-w-4xl mx-auto">
        <BookingForm />
      </div>
    </div>
  );
}
