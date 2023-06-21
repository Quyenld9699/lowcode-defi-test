'use client';
import { Clear, Send, Telegram } from '@mui/icons-material';
import { Box, Button, Fab, Typography } from '@mui/material';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { fadeUpAnimation } from 'src/assets/animations/fadeUp';
import { tadaAnimation } from 'src/assets/animations/tada';
import { imagePath } from 'src/constants/imagePath';

type Props = {
    button?: {
        bgcolor?: string;
        width?: string;
        height?: string;
    };
    iconButton?: ReactNode;
    boxChat: {
        headerBgColor?: string;
        avatarUrl?: string;
        name: ReactNode;
        desc: ReactNode;
    };
};

export default function ChatBotWidget(props: Props) {
    const { button } = props;
    const buttonWidth = button?.width || '60px';
    const buttonHeight = button?.height || '60px';
    const current = new Date();
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: '15px',
                right: '15px',
                width: buttonWidth,
                height: buttonHeight,
                '& > #toggle-chatbot-widget': {
                    '& + div': {
                        transition: '0.2s',
                        touchAction: 'none',
                        pointerEvents: 'none',
                        opacity: 0,
                        transform: 'translate(0px,100px)',
                        zIndex: -1,
                    },
                    '&:checked': {
                        '& + div': {
                            touchAction: 'auto',
                            pointerEvents: 'all',
                            opacity: 1,
                            transform: 'translate(0px,0px)',
                            zIndex: 1,
                        },
                    },
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    borderRadius: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: props.button?.bgcolor || 'primary.main',
                    cursor: 'pointer',
                }}
                component={'label'}
                htmlFor="toggle-chatbot-widget"
            >
                {props.iconButton || <Telegram sx={{ fontSize: '28px', animation: tadaAnimation }} />}
            </Box>
            <input type="checkbox" name="toggle-chatbot" id="toggle-chatbot-widget" style={{ display: 'none' }} />
            <Box
                sx={{
                    // animation: fadeUpAnimation,
                    width: '360px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'absolute',
                    bottom: '75px',
                    right: 0,
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 12px 24px 0px',
                }}
            >
                <Box sx={{ bgcolor: props.boxChat?.headerBgColor || 'primary.main', minHeight: '100px', padding: '24px 20px', display: 'flex', gap: 2 }}>
                    <Image src={imagePath.CHATBOT_AVATAR} alt="chatbot avatar" style={{ width: '52px', height: '52px', borderRadius: '50%' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', flexGrow: 1 }}>
                        <Typography variant="body1" fontWeight={600}>
                            {props.boxChat.name}
                        </Typography>
                        <Typography variant="caption2" fontWeight={400}>
                            {props.boxChat.desc}
                        </Typography>
                    </Box>
                    <Box component={'label'} htmlFor="toggle-chatbot-widget" sx={{ cursor: 'pointer' }}>
                        <Clear />
                    </Box>
                </Box>
                <Box sx={{ padding: '20px 20px 20px 15px', bgcolor: 'rgb(245, 245, 245)' }}>
                    <Box sx={{ padding: '7px 14px', background: 'white', maxWidth: '264px', borderRadius: '9px', position: 'relative', filter: 'drop-shadow(0px 2px 1px #b3b3b3)' }}>
                        <Box sx={{ position: 'absolute', top: '12px', left: '-4px', transform: 'rotate(45deg)', background: 'white', width: '16px', height: '16px' }}></Box>
                        <Box sx={{ position: 'relative' }}>
                            <Typography sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '13px', fontWeight: 700 }}>{props.boxChat.name}</Typography>
                            <Typography sx={{ fontSize: '14px', color: 'rgb(17, 17, 17)', mt: 1 }}>Planning a boating adventure mate? 🚣‍ Let me help you choose your beauty.</Typography>
                            <Typography sx={{ fontSize: '12px', color: 'rgba(17, 17, 17, 0.5)', textAlign: 'right' }}>
                                {current.getHours()}:{current.getMinutes()}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ padding: '24px 20px', background: 'white' }}>
                    <Button startIcon={<Telegram />} variant="contained" fullWidth sx={{ borderRadius: '24px', textTransform: 'none' }}>
                        Ask your question
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
