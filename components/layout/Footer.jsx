"use client";

import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function MyFooter() {
  return (
    <Footer container className="rounded-none border-t">
      <div className="w-full">
        <div className="flex justify-end">
          <div className="flex space-y-3">
            <Footer.LinkGroup>
              <Footer.Link href="/privacy-policy">Privacy Policy</Footer.Link>
              <Footer.Link href="/terms-and-conditions">Terms &amp; Conditions</Footer.Link>
              <Footer.Link href="/refund-policy">Refund Policy</Footer.Link>
              <Footer.Link href="/contact">Contact</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Transparestate™" year={2025} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
