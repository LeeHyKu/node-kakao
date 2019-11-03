import { LocoRequestPacket, LocoResponsePacket } from "./loco-packet-base";
import { PacketGetConfReq, PacketGetConfRes } from "./packet-get-conf";
import { PacketCheckInReq, PacketCheckInRes } from "./packet-check-in";
import { PacketLoginReq, PacketLoginRes } from "./packet-login";
import { PacketMessageRes, PacketMessageWriteReq, PacketMessageWriteRes } from "./packet-message";
import { PacketMessageReadRes } from "./packet-message-read";
import { PacketKickoutRes } from "./packet-kickout";
import { PacketInvoiceRes } from "./packet-invoice";
import { PacketNewMemberRes } from "./packet-new-member";
import { PacketLeftRes, PacketLeaveReq } from "./packet-leave";
import { PacketChatMemberReq, PacketChatMemberRes } from "./packet-chat-member";
import { PacketChatInfoReq, PacketChatInfoRes } from "./packet-chatinfo";
import { PacketChanJoinRes } from "./packet-chan-join";
import { PacketGetMemberRes, PacketGetMemberReq } from "./packet-get-member";

/*
 * Created on Wed Oct 30 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class LocoPacketList {

    private static reqeustPacketMap: Map<string, () => LocoRequestPacket>;
    private static responsePacketMap: Map<string, (status: number) => LocoResponsePacket>;

    static init() {
        LocoPacketList.initReqMap();
        LocoPacketList.initResMap();
    }

    protected static initReqMap() {
        LocoPacketList.reqeustPacketMap = new Map();

        LocoPacketList.reqeustPacketMap.set('GETCONF', () => new PacketGetConfReq());
        LocoPacketList.reqeustPacketMap.set('CHECKIN', () => new PacketCheckInReq());
        LocoPacketList.reqeustPacketMap.set('LOGINLIST', () => new PacketLoginReq());

        LocoPacketList.reqeustPacketMap.set('WRITE', () => new PacketMessageWriteReq());
        LocoPacketList.reqeustPacketMap.set('MEMBER', () => new PacketChatMemberReq());
        LocoPacketList.reqeustPacketMap.set('CHATINFO', () => new PacketChatInfoReq());

        LocoPacketList.reqeustPacketMap.set('GETMEM', () => new PacketGetMemberReq());

        LocoPacketList.reqeustPacketMap.set('LEAVE', () => new PacketLeaveReq());
    }

    protected static initResMap() {
        LocoPacketList.responsePacketMap = new Map();

        LocoPacketList.responsePacketMap.set('GETCONF', (status) => new PacketGetConfRes(status));
        LocoPacketList.responsePacketMap.set('CHECKIN', (status) => new PacketCheckInRes(status));

        LocoPacketList.responsePacketMap.set('LOGINLIST', (status) => new PacketLoginRes(status));

        LocoPacketList.responsePacketMap.set('MSG', (status) => new PacketMessageRes(status));
        LocoPacketList.responsePacketMap.set('WRITE', (status) => new PacketMessageWriteRes(status));
        LocoPacketList.responsePacketMap.set('DECUNREAD', (status) => new PacketMessageReadRes(status));
        LocoPacketList.responsePacketMap.set('MEMBER', (status) => new PacketChatMemberRes(status));
        LocoPacketList.responsePacketMap.set('CHATINFO', (status) => new PacketChatInfoRes(status));

        LocoPacketList.responsePacketMap.set('GETMEM', (status) => new PacketGetMemberRes(status));

        LocoPacketList.responsePacketMap.set('NEWMEM', (status) => new PacketNewMemberRes(status));
        LocoPacketList.responsePacketMap.set('LEFT', (status) => new PacketLeftRes(status));
        LocoPacketList.responsePacketMap.set('SYNCJOIN', (status) => new PacketChanJoinRes(status));

        LocoPacketList.responsePacketMap.set('INVOICE', (status) => new PacketInvoiceRes(status));

        LocoPacketList.responsePacketMap.set('KICKOUT', (status) => new PacketKickoutRes(status));
    }

    static hasReqPacket(name: string): boolean {
        return LocoPacketList.reqeustPacketMap && LocoPacketList.reqeustPacketMap.has(name);
    }

    static hasResPacket(name: string): boolean {
        return LocoPacketList.responsePacketMap && LocoPacketList.responsePacketMap.has(name);
    }

    static getReqPacketByName(name: string): LocoRequestPacket {
        if (!LocoPacketList.hasReqPacket(name)) {
            throw new Error(`${name} is not valid loco request packet`);
        }

        return LocoPacketList.reqeustPacketMap.get(name)!();
    }

    static getResPacketByName(name: string, status: number): LocoResponsePacket {
        if (!LocoPacketList.hasResPacket(name)) {
            throw new Error(`${name} is not valid loco response packet`);
        }

        return LocoPacketList.responsePacketMap.get(name)!(status);
    }

}

LocoPacketList.init();