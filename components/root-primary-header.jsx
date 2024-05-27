"use client";

import ListItemButton from "@mui/material/ListItemButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { start } from "nprogress";
import Image from "next/image";
import Link from "next/link";

import HeaderPopoverMenu from "#/components/header-popover-menu";
import { useMode } from "#/components/global/theme-registry";
import NProgressLink from "#/components/nprogress-link";
import Settings from "#/components/settings";
import AppLogo from "#/components/app-logo";
import Iconify from "#/components/iconify";

import menu from "#/public/svg/menu.svg";

function MobileMenu() {
  const pathname = usePathname();

  const [openDrawer, setOpenDrawer] = useState(false);

  const root = pathname === "/";
  const faq = pathname === "/faq";

  return (
    <>
      <IconButton
        onClick={() => {
          setOpenDrawer(true);
        }}
        sx={{ ml: "8px" }}
      >
        <Image src={menu} alt="Меню" />
      </IconButton>
      <Drawer
        open={openDrawer}
        anchor="left"
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <Stack gap={3} flexShrink={0} padding="24px 20px 16px">
          <AppLogo />
        </Stack>
        <Stack>
          <List disablePadding sx={{ p: "8px" }}>
            <Link href="/">
              <ListItemButton
                onClick={() => !root && start()}
                sx={{
                  color: root ? "primary.light" : "text.secondary",
                  backgroundColor: root
                    ? "rgba(0, 167, 111, 0.08)"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: root
                      ? "rgba(0, 167, 111, 0.16)"
                      : "rgba(145, 158, 171, 0.08)",
                  },
                }}
              >
                <Iconify icon="solar:home-2-bold-duotone" sx={{ mr: "16px" }} />
                <ListItemText
                  primaryTypographyProps={{
                    variant: "body2",
                    sx: { fontWeight: root ? 600 : 400 },
                  }}
                >
                  Главная
                </ListItemText>
              </ListItemButton>
            </Link>
            <Link href="/faq">
              <ListItemButton
                onClick={() => !faq && start()}
                sx={{
                  color: faq ? "primary.light" : "text.secondary",
                  backgroundColor: faq
                    ? "rgba(0, 167, 111, 0.08)"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: faq
                      ? "rgba(0, 167, 111, 0.16)"
                      : "rgba(145, 158, 171, 0.08)",
                  },
                }}
              >
                <Iconify
                  icon="solar:notebook-bold-duotone"
                  sx={{ mr: "16px" }}
                />
                <ListItemText
                  primaryTypographyProps={{
                    variant: "body2",
                    sx: { fontWeight: faq ? 600 : 400 },
                  }}
                >
                  FAQ
                </ListItemText>
              </ListItemButton>
            </Link>
          </List>
        </Stack>
      </Drawer>
    </>
  );
}

function HeaderAction({ name, email }) {
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (anchorEl && !anchorEl.contains(event.target)) {
        setAnchorEl(null);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [anchorEl]);

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        sx={{
          width: "39.5px",
          height: "39.5px",
        }}
        style={{
          background: open
            ? "linear-gradient(135deg, rgb(91, 228, 155) 0%, rgb(0, 167, 111) 100%)"
            : "rgba(145, 158, 171, 0.08)",
        }}
      >
        <Avatar
          sx={{
            width: "36px",
            height: "36px",
            "&:hover": {
              borderRadius: "16px",
            },
          }}
        >
          {name.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        disableScrollLock
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
        slotProps={{
          paper: {
            style: {
              width: 200,
            },
          },
        }}
      >
        <HeaderPopoverMenu
          email={email}
          username={name}
          setAnchorEl={setAnchorEl}
        />
      </Popover>
    </>
  );
}

function HeaderLinks({ scrolled }) {
  const pathname = usePathname();
  const { mode } = useMode();

  const root = pathname === "/";
  const faq = pathname === "/faq";

  return scrolled ? (
    <>
      <Link href="/">
        <ListItemButton
          disableRipple
          onClick={() => !root && start()}
          sx={{
            p: "0px",
            transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            fontWeight: 600,
            fontSize: "0.875rem",
            color: "text.primary",
            height: "100%",
            "&::after": {
              display: "block",
              position: "absolute",
              height: "4px",
              left: "0px",
              right: "0px",
              bottom: "0px",
              borderRadius: "3px 3px 0px 0px",
              content: '""',
              backgroundColor: root ? "primary.main" : "transparent",
            },
            "&:hover": {
              color:
                mode === "dark"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(33, 43, 54, 0.7)",
              backgroundColor: "transparent",
              "&::after": {
                display: "block",
                position: "absolute",
                height: "4px",
                left: "0px",
                right: "0px",
                bottom: "0px",
                borderRadius: "3px 3px 0px 0px",
                content: '""',
                backgroundColor: root
                  ? "rgba(0, 167, 111, 0.7)"
                  : mode === "dark"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(33, 43, 54, 0.7)",
              },
            },
          }}
        >
          Главная
        </ListItemButton>
      </Link>
      <Link href="/faq">
        <ListItemButton
          disableRipple
          onClick={() => !faq && start()}
          sx={{
            p: "0px",
            transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            fontWeight: 600,
            fontSize: "0.875rem",
            color: "text.primary",
            height: "100%",
            "&::after": {
              display: "block",
              position: "absolute",
              height: "4px",
              left: "0px",
              right: "0px",
              bottom: "0px",
              borderRadius: "3px 3px 0px 0px",
              content: '""',
              backgroundColor: faq ? "primary.main" : "transparent",
            },
            "&:hover": {
              color:
                mode === "dark"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(33, 43, 54, 0.7)",
              backgroundColor: "transparent",
              "&::before": {
                display: "block",
                position: "absolute",
                height: "4px",
                left: "0px",
                right: "0px",
                bottom: "0px",
                borderRadius: "3px 3px 0px 0px",
                content: '""',
                backgroundColor: faq
                  ? "rgba(0, 167, 111, 0.7)"
                  : mode === "dark"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(33, 43, 54, 0.7)",
              },
            },
          }}
        >
          FAQ
        </ListItemButton>
      </Link>
    </>
  ) : (
    <>
      <Link href="/">
        <ListItemButton
          disableRipple
          onClick={() => !root && start()}
          sx={{
            p: "0px",
            transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            fontWeight: 600,
            fontSize: "0.875rem",
            color: root ? "primary.main" : "text.primary",
            height: "100%",
            "&::before": {
              content: '""',
              borderRadius: "50%",
              position: "absolute",
              width: "6px",
              height: "6px",
              left: "-14px",
              opacity: 0.48,
              backgroundColor: root ? "primary.main" : "transparent",
            },
            "&:hover": {
              color: root
                ? "rgba(0, 167, 111, 0.7)"
                : mode === "dark"
                ? "rgba(255, 255, 255, 0.7)"
                : "rgba(33, 43, 54, 0.7)",
              backgroundColor: "transparent",
              "&::before": {
                content: '""',
                borderRadius: "50%",
                position: "absolute",
                width: "6px",
                height: "6px",
                left: "-14px",
                opacity: 0.48,
                backgroundColor: root
                  ? "rgba(0, 167, 111, 0.7)"
                  : mode === "dark"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(33, 43, 54, 0.7)",
              },
            },
          }}
        >
          Главная
        </ListItemButton>
      </Link>
      <Link href="/faq">
        <ListItemButton
          disableRipple
          onClick={() => !faq && start()}
          sx={{
            p: "0px",
            transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            fontWeight: 600,
            fontSize: "0.875rem",
            color: faq ? "primary.main" : "text.primary",
            height: "100%",
            "&::before": {
              content: '""',
              borderRadius: "50%",
              position: "absolute",
              width: "6px",
              height: "6px",
              left: "-14px",
              opacity: 0.48,
              backgroundColor: faq ? "primary.main" : "transparent",
            },
            "&:hover": {
              color: faq
                ? "rgba(0, 167, 111, 0.7)"
                : mode === "dark"
                ? "rgba(255, 255, 255, 0.7)"
                : "rgba(33, 43, 54, 0.7)",
              backgroundColor: "transparent",
              "&::before": {
                content: '""',
                borderRadius: "50%",
                position: "absolute",
                width: "6px",
                height: "6px",
                left: "-14px",
                opacity: 0.48,
                backgroundColor: faq
                  ? "rgba(0, 167, 111, 0.7)"
                  : mode === "dark"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(33, 43, 54, 0.7)",
              },
            },
          }}
        >
          FAQ
        </ListItemButton>
      </Link>
    </>
  );
}

export default function RootPrimaryHeader() {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const session = useSession();
  const { mode } = useMode();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar>
      <Toolbar
        sx={{
          transition:
            "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          backdropFilter: scrolled ? "blur(6px)" : "none",
          height: scrolled ? "56px" : isSmallScreen ? "64px" : "70px",
          backgroundColor: scrolled
            ? mode === "dark"
              ? "rgba(22, 28, 36, 0.72)"
              : "rgba(249, 250, 251, 0.72)"
            : "transparent",
        }}
      >
        <Container
          sx={{ display: "flex", alignItems: "center", height: "100%" }}
        >
          <AppLogo />
          <Box sx={{ flexGrow: 1 }} />
          {!isSmallScreen ? (
            <>
              <Stack
                gap="40px"
                height="100%"
                component="nav"
                marginLeft="70px"
                flexDirection="row"
              >
                <HeaderLinks scrolled={scrolled} />
              </Stack>
              {!scrolled && (
                <Settings
                  sx={{
                    mr: "8px",
                    display: "inline-flex",
                    "@media (min-width: 900px)": {
                      ml: "40px",
                      mr: "0px",
                    },
                  }}
                />
              )}
              <Box sx={{ flexGrow: 1 }} />
              {session.status === "authenticated" ? (
                <HeaderAction
                  name={session.data.user.name}
                  email={session.data.user.email}
                />
              ) : (
                <Stack gap="12px" flexDirection="row">
                  <NProgressLink path="/login">
                    <Button variant="outlined" color="inherit" size="medium">
                      Войти
                    </Button>
                  </NProgressLink>
                  <NProgressLink path="/register">
                    <Button variant="contained" color="inherit" size="medium">
                      Создать аккаунт
                    </Button>
                  </NProgressLink>
                </Stack>
              )}
            </>
          ) : (
            <>
              <Settings sx={{ mr: "8px" }} />
              {session.status === "authenticated" ? (
                <HeaderAction
                  name={session.data.user.name}
                  email={session.data.user.email}
                />
              ) : (
                <NProgressLink path="/login">
                  <Button variant="outlined" color="inherit" size="medium">
                    Войти
                  </Button>
                </NProgressLink>
              )}
              <MobileMenu />
            </>
          )}
        </Container>
      </Toolbar>
      {scrolled && (
        <Divider
          sx={{
            borderStyle: "solid",
          }}
        />
      )}
    </AppBar>
  );
}
