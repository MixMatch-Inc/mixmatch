import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, Mail } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
            </div>
            
            <div className="text-sm text-gray-500 mb-6 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last updated: May 15, 2025</span>
            </div>

            <div className="prose max-w-none text-gray-700">
              <p>
                Welcome to MixMatch. These Terms of Service ("Terms") govern your use of the MixMatch website, mobile applications, and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. User Roles and Responsibilities</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">2.1 Event Organizers</h3>
              <p>
                As an event organizer, you are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Providing accurate and complete information about your event</li>
                <li>Communicating clearly with DJs about your requirements</li>
                <li>Making payments as agreed in the booking contract</li>
                <li>Providing a safe and appropriate environment for the DJ to perform</li>
                <li>Adhering to the cancellation policy as outlined in your booking contract</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">2.2 DJs</h3>
              <p>
                As a DJ using our platform, you are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Providing accurate information about your services, experience, and rates</li>
                <li>Maintaining a professional standard of service</li>
                <li>Arriving on time and prepared for booked events</li>
                <li>Communicating promptly with event organizers</li>
                <li>Adhering to the cancellation policy as outlined in your booking contracts</li>
                <li>Ensuring you have all necessary equipment and licenses to perform legally</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Bookings and Payments</h2>
              <p>
                MixMatch facilitates bookings between event organizers and DJs. All bookings made through our platform are subject to the following terms:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>A booking is confirmed only after both parties have agreed to the terms and the deposit has been paid</li>
                <li>MixMatch charges a service fee for each booking, which is clearly displayed before confirmation</li>
                <li>All payments must be made through our secure payment system</li>
                <li>DJs will receive payment according to the schedule outlined in their booking contract</li>
                <li>MixMatch holds deposits in escrow until services are rendered satisfactorily</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Cancellation Policy</h2>
              <p>
                Our standard cancellation policy is as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Cancellations made by organizers more than 30 days before the event: Full refund minus processing fees</li>
                <li>Cancellations made by organizers 15-30 days before the event: 50% refund</li>
                <li>Cancellations made by organizers less than 15 days before the event: No refund</li>
                <li>Cancellations made by DJs: The DJ must find a suitable replacement of equal or higher quality, or they may be subject to penalties as outlined in their agreement with MixMatch</li>
              </ul>
              <p>
                Individual booking contracts may have specific cancellation terms that supersede these standard terms.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of MixMatch and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of MixMatch.
              </p>
              <p>
                DJs retain all rights to their original content, performances, and brand. By using our platform, DJs grant MixMatch a non-exclusive license to use their profile information, images, and music samples for promotional purposes on our platform.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h2>
              <p>
                In no event shall MixMatch, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Dispute Resolution</h2>
              <p>
                In the event of a dispute between an organizer and a DJ, MixMatch will act as a mediator to help resolve the issue. Both parties agree to work in good faith to resolve any disputes. If mediation is unsuccessful, disputes will be resolved according to the arbitration clause in the booking contract.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">10. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-2 flex items-center">
                <Mail className="h-5 w-5 text-indigo-600 mr-2" />
                <span>legal@mixmatch.com</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link to="/privacy" className="text-indigo-600 hover:text-indigo-800">
                View our Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;