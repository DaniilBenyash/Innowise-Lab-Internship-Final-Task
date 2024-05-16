import React, { useRef, DragEvent, ChangeEvent, useMemo } from "react";
import { IconButton } from "shared/components/IconButton";
import { FlexLayout } from "shared/components/FlexLayout";
import { H6, P } from "shared/components/Typography";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Avatar } from "modules/employees/hooks/avatar/useUploadAvatar";
import { Avatar as AvatarIcon } from "shared/components/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import { Badge } from "shared/components/Badge";
import { Profile } from "modules/employees/hooks";

type LoadingAvatarProps = {
  onUploadAvatar: (avatar: Avatar) => void;
  onRemoveAvatar: () => void;
  profile: Profile;
  isOwner: boolean;
};

const ALLOWED_FILE_SIZE = 500000;

const LoadingAvatar = ({
  onUploadAvatar,
  profile,
  onRemoveAvatar,
  isOwner,
}: LoadingAvatarProps) => {
  const avatarPicker = useRef(null);
  const { t } = useTranslation();
  const allowedFiles = useMemo(() => ["png", "jpg", "gif", "jpeg"], []);

  const getAvatar = (avatar: Blob) => {
    if (avatar.size > ALLOWED_FILE_SIZE) {
      return toast.error(t("errors.fileSize"));
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const resultAvatar = {
        base64: reader.result as string,
        size: avatar.size,
        type: avatar.type,
      };
      onUploadAvatar(resultAvatar);
    };
    reader.readAsDataURL(avatar);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const avatar = event.target.files[0];
    getAvatar(avatar);
  };

  const handleDropChange = (event: DragEvent<HTMLDivElement>) => {
    if (!isOwner) {
      return;
    }

    event.preventDefault();
    const avatar = event.dataTransfer.files[0];

    if (!allowedFiles.some(file => avatar.type.includes(file))) {
      return toast.error(t("errors.avatar"));
    }
    getAvatar(avatar);
  };

  const handleClick = () => {
    if (!isOwner) {
      return;
    }
    avatarPicker.current.click();
  };

  const handleDragEvent = (event: DragEvent<Element>) => {
    event.preventDefault();
  };
  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onRemoveAvatar();
  };
  return (
    <FlexLayout direction="row" spacing="uploadingImage">
      <IconButton onClick={handleClick} ariaLabel="avatar">
        <Badge
          badge={
            isOwner && (
              <IconButton ariaLabel="remove-avatar" onClick={handleRemove}>
                <CloseIcon />
              </IconButton>
            )
          }
          badgePlacement="rectangular"
          verticalBadgePlacement="top"
          horizontalBadgePlacement="right"
        >
          <AvatarIcon
            size="large"
            alt="avatar"
            name={profile?.firstName}
            src={profile?.avatar}
          />
        </Badge>
      </IconButton>
      <input
        ref={avatarPicker}
        type="file"
        accept=".png, .jpg, .jpeg, .gif"
        onChange={handleChange}
        hidden
      />
      <div
        onDragStart={handleDragEvent}
        onDragLeave={handleDragEvent}
        onDragOver={handleDragEvent}
        onDrop={handleDropChange}
      >
        <FlexLayout>
          <FlexLayout
            alginItems="center"
            justifyContent="center"
            direction="row"
          >
            <FlexLayout direction="row" spacing="chips">
              <FileUploadOutlinedIcon sx={{ fontSize: "40px" }} />
              <H6 fontWeight="bold">{t("avatar.upload")}</H6>
            </FlexLayout>
          </FlexLayout>
          <P size="large" color="darkgrey">
            {t("avatar.description")}
          </P>
        </FlexLayout>
      </div>
    </FlexLayout>
  );
};

export { LoadingAvatar };
