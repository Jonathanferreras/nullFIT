import CircularProgress from "@mui/material/CircularProgress";

export const Loader = ({ isFullPage }: { isFullPage: boolean }) => {
  const fullPage = isFullPage === undefined ? false : isFullPage;

  return fullPage ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <CircularProgress />
  );
};
