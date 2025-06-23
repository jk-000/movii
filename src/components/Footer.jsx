const Footer = () => {
   return (
     <>
       {/* Gray background ka content upar chalega, yahaan tak */}
       <hr className="border-gray-300" />
       {/* White background footer section */}
       <div className="bg-white">
         <footer className="text-center py-6 text-sm text-gray-600">
           © {new Date().getFullYear()} JKHubMovies. All rights reserved.
         </footer>
       </div>
     </>
   );
 };
 
 export default Footer;
 