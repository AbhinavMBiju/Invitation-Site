export function QRCodeBox() {
  return (
    <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-sm border border-[#E8E0D8]">
      <div className="text-sm text-[#8B7B73] mb-1">Scan for quick directions</div>
      
      {/* QR Image Box */}
      <div className="w-32 h-32 bg-white p-2 rounded-lg border-2 border-[#4B3B33] flex items-center justify-center">
        {/* make sure the image is in your /public folder */}
        <img
          src="/frame.png"
          alt="QR Code for directions"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
