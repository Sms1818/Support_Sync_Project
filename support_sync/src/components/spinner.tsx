const spinner = () => {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="loader"></div>
        <style>{`
          .loader {
            border: 8px solid rgba(255, 255, 255, 0.2);
            border-top: 8px solid #ffffff;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  };
  
  export default spinner;
  