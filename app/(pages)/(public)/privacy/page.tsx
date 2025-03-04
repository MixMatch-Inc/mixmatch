import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
            
            <div className="text-sm text-gray-500 mb-6 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last updated: May 15, 2025</span>
            </div>

            <div className="prose max-w-none text-gray-700">
              <p>
                At MixMatch, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Personal Data</h3>
              <p>
                We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, credit card information. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Non-Personal Data</h3>
              <p>
                We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">How We Use Collected Information</h2>
              <p>
                MixMatch may collect and use Users personal information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>To improve customer service: Information you provide helps us respond to your customer service requests and support needs more efficiently.</li>
                <li>To personalize user experience: We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
                <li>To improve our Site: We may use feedback you provide to improve our products and services.</li>
                <li>To process payments: We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.</li>
                <li>To run a promotion, contest, survey or other Site feature: To send Users information they agreed to receive about topics we think will be of interest to them.</li>
                <li>To send periodic emails: We may use the email address to send User information and updates pertaining to their order. It may also be used to respond to their inquiries, questions, and/or other requests.</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">How We Protect Your Information</h2>
              <p>
                We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.
              </p>
              <p>
                Sensitive and private data exchange between the Site and its Users happens over a SSL secured communication channel and is encrypted and protected with digital signatures. Our Site is also in compliance with PCI vulnerability standards in order to create as secure of an environment as possible for Users.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Sharing Your Personal Information</h2>
              <p>
                We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Third Party Websites</h2>
              <p>
                Users may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our Site, is subject to that website's own terms and policies.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
              <p>
                MixMatch has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Your Acceptance of These Terms</h2>
              <p>
                By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Contacting Us</h2>
              <p>
                If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-2 flex items-center">
                <Mail className="h-5 w-5 text-indigo-600 mr-2" />
                <span>privacy@mixmatch.com</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link to="/terms" className="text-indigo-600 hover:text-indigo-800">
                View our Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;