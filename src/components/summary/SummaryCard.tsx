import {
    Card,
    CardContent,
    LinearProgress,
    Typography,
  } from "@mui/material";
  
  import type { ReactNode } from "react";
  
  type Props = {
    title: string;
    value: string;
    color: string;
    icon?: ReactNode;
    progress?: number;
    onClick?: () => void;
  };
  
  export default function SummaryCard({
    title,
    value,
    color,
    icon,
    progress,
    onClick,
  }: Props) {
    return (
      <Card
        onClick={onClick}
        elevation={0}
        sx={{ cursor: onClick ? "pointer" : "default", height: "100%", transition: "transform 160ms ease, box-shadow 160ms ease", ...(onClick ? { "&:hover": { transform: "translateY(-2px)", boxShadow: 3 }, "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main" } } : {}) }}
      >
        <CardContent>
  
          <Typography
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {icon}
            {title}
          </Typography>
  
          <Typography
            variant="h4"
            sx={{
              color,
              mt: 1,
              fontWeight: 750,
              letterSpacing: -0.7,
            }}
          >
            {value}
          </Typography>
  
          {progress !== undefined && (
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                mt: 2,
                height: 8,
                borderRadius: 2,
              }}
            />
          )}
        </CardContent>
      </Card>
    );
  }
