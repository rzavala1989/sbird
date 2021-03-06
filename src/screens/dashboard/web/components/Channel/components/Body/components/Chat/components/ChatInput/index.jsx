import React, { Fragment, useState } from 'react'
import { Button, Col, Input, Upload, message } from 'antd'
import { PictureOutlined, SendOutlined } from '@ant-design/icons'

import { PickerButton } from '@components'
import { PRIMARY_COLOR } from '@constants'
import { useDashboard, useSendBird } from '@context'
import { messageDto } from '@dto'
import { ScaleIn } from '@animations'

export function ChatInput() {
    const { channel, setMessages } = useDashboard()
    const { sendUserMessage, sendFileMessage } = useSendBird()

    const [typingText, setTypingText] = useState('')

    const handleEmojiMart = (emoji) => {
        setTypingText((prevState) => prevState + emoji.native)
    }

    const onChange = (e) => {
        setTypingText(e.target.value)
    }

    const handleKeyDown = async (e) => {
        if (e.keyCode === 13) {
            handleSendMessage()
        }
    }

    const handleSendMessage = async (e) => {
        if (typingText === '') return

        // console.log(typingText)
        const newUserMessage = await sendUserMessage(channel, typingText)
        // console.log(newUserMessage)
        const formatNewUserMessage = messageDto(channel, newUserMessage)
        setMessages((prevState) => [...prevState, formatNewUserMessage])
        setTypingText('')
    }

    const handleUploadFile = async (file) => {
        try {
            console.log(file)
            const fileMessage = await sendFileMessage(
                channel,
                file,
                file.name,
                file.size,
                file.type
            )
            const formatNewUserMessage = messageDto(channel, fileMessage)
            setMessages((prevState) => [...prevState, formatNewUserMessage])
            fileMessage && message.success('File updated successfully.')
        } catch (error) {
            message.error(error)
        }
    }

    return (
        <Fragment>
            <Col
                style={{
                    padding: 12,
                    width: 'calc(100% - 120px)',
                }}
            >
                <Input
                    placeholder="Type a message..."
                    value={typingText}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => channel.startTyping()}
                    onBlur={() => channel.endTyping()}
                />
            </Col>
            <Col
                style={{
                    float: 'right',
                    display: 'flex',
                }}
            >
                <Upload beforeUpload={handleUploadFile} showUploadList={false}>
                    <ScaleIn>
                        <Button
                            style={{
                                border: 0,
                                display: 'inline-block',
                                cursor: 'pointer',
                            }}
                            type="ghost"
                            icon={<PictureOutlined />}
                            size="large"
                        />
                    </ScaleIn>
                </Upload>
                <ScaleIn>
                    <PickerButton
                        style={{
                            position: 'absolute',
                            bottom: 42,
                            right: 42,
                        }}
                        handleEmojiMart={handleEmojiMart}
                    />
                </ScaleIn>
                <Button
                    style={{ border: 0 }}
                    type="ghost"
                    icon={
                        <SendOutlined
                            style={{
                                color: PRIMARY_COLOR,
                            }}
                        />
                    }
                    size="large"
                    onClick={handleSendMessage}
                />
            </Col>
        </Fragment>
    )
}
