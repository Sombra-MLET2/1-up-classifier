export enum ClassEnum {
    poisonous = "p",
    edible = "e",
}

export enum CapShapeEnum {
    bell = "b",
    conical = "c",
    convex = "x",
    flat = "f",
    sunken = "s",
    spherical = "p",
    others = "o",
}

export enum CapSurfaceEnum {
    fibrous = "i",
    grooves = "g",
    scaly = "y",
    smooth = "s",
    shiny = "h",
    leathery = "l",
    silky = "k",
    sticky = "t",
    wrinkled = "w",
    fleshy = "e",
}

export enum CapColorEnum {
    brown = "n",
    buff = "b",
    gray = "g",
    green = "r",
    pink = "p",
    purple = "u",
    red = "e",
    white = "w",
    yellow = "y",
    blue = "l",
    orange = "o",
    black = "k",
}

export enum DoesBruiseBleedEnum {
    bruises_or_bleeding = "t",
    no = "f",
}

export enum HasRingEnum {
    yes = "t",
    no = "f",
}

export enum GillAttachmentEnum {
    adnate = "a",
    adnexed = "x",
    decurrent = "d",
    free = "e",
    sinuate = "s",
    pores = "p",
    none = "f",
    unknown = "?",
}

export enum GillSpacingEnum {
    close = "c",
    distant = "d",
    none = "f",
}

export enum StemRootEnum {
    bulbous = "b",
    swollen = "s",
    club = "c",
    cup = "u",
    equal = "e",
    rhizomorphs = "z",
    rooted = "r",
}

export enum VeilTypeEnum {
    partial = "p",
    universal = "u",
}

export enum RingTypeEnum {
    cobwebby = "c",
    evanescent = "e",
    flaring = "r",
    grooved = "g",
    large = "l",
    pendant = "p",
    sheathing = "s",
    zone = "z",
    scaly = "y",
    movable = "m",
    none = "f",
    unknown = "?",
}

export enum HabitatEnum {
    grasses = "g",
    leaves = "l",
    meadows = "m",
    paths = "p",
    heaths = "h",
    urban = "u",
    waste = "w",
    woods = "d",
}

export enum SeasonEnum {
    spring = "s",
    summer = "u",
    autumn = "a",
    winter = "w",
}

export interface MushroomDTO {
    id?: number;
    mushroom_class?: ClassEnum;
    cap_diameter: number;
    cap_shape?: CapShapeEnum;
    cap_surface?: CapSurfaceEnum;
    cap_color?: CapColorEnum;
    does_bruise_bleed?: DoesBruiseBleedEnum;
    gill_attachment?: GillAttachmentEnum;
    gill_spacing?: GillSpacingEnum;
    gill_color?: CapColorEnum;
    stem_height: number;
    stem_width: number;
    stem_root?: StemRootEnum;
    stem_surface?: CapSurfaceEnum;
    stem_color?: CapColorEnum;
    veil_type?: VeilTypeEnum;
    veil_color?: CapColorEnum;
    has_ring?: DoesBruiseBleedEnum;
    ring_type?: RingTypeEnum;
    spore_print_color?: CapColorEnum;
    habitat?: HabitatEnum;
    season?: SeasonEnum;
}

export interface MushroomPageResponse {
    total: number;
    page: number
    data: MushroomDTO[]
}

export class Mushroom implements MushroomDTO {
    id?: number;
    mushroom_class?: ClassEnum;
    cap_diameter: number = 0;
    cap_shape?: CapShapeEnum;
    cap_surface?: CapSurfaceEnum;
    cap_color?: CapColorEnum;
    does_bruise_bleed?: DoesBruiseBleedEnum;
    gill_attachment?: GillAttachmentEnum;
    gill_spacing?: GillSpacingEnum;
    gill_color?: CapColorEnum;
    stem_height: number = 0;
    stem_width: number = 0;
    stem_root?: StemRootEnum;
    stem_surface?: CapSurfaceEnum;
    stem_color?: CapColorEnum;
    veil_type?: VeilTypeEnum;
    veil_color?: CapColorEnum;
    has_ring?: DoesBruiseBleedEnum;
    ring_type?: RingTypeEnum;
    spore_print_color?: CapColorEnum;
    habitat?: HabitatEnum;
    season?: SeasonEnum;

    constructor(data: MushroomDTO) {
        Object.assign(this, data);
    }

    private getEnumString<E extends string, T extends Record<E, string>>(enumMapping: T, value: E): string {
        return enumMapping[value];
    }

    get class(): string {
        return this.getEnumString(ClassEnumToString, this.mushroom_class!);
    }

    get capShape(): string {
        return this.getEnumString(CapShapeEnumToString, this.cap_shape!);
    }

    get capSurface(): string {
        return this.getEnumString(CapSurfaceEnumToString, this.cap_surface!);
    }

    get capColor(): string {
        return this.getEnumString(CapColorEnumToString, this.cap_color!);
    }

    get doesBruiseBleed(): string {
        return this.getEnumString(DoesBruiseBleedEnumToString, this.does_bruise_bleed!);
    }

    get gillAttachment(): string {
        return this.getEnumString(GillAttachmentEnumToString, this.gill_attachment!);
    }

    get gillSpacing(): string {
        return this.getEnumString(GillSpacingEnumToString, this.gill_spacing!);
    }

    get stemRoot(): string {
        return this.getEnumString(StemRootEnumToString, this.stem_root!);
    }

    get stemColor(): string {
        return this.getEnumString(CapColorEnumToString, this.stem_color!);
    }

    get veilType(): string {
        return this.getEnumString(VeilTypeEnumToString, this.veil_type!);
    }

    get hasRing(): string {
        return this.getEnumString(HasRingEnumToString, this.has_ring!);
    }

    get ringType(): string {
        return this.getEnumString(RingTypeEnumToString, this.ring_type!);
    }

    get habitatName(): string {
        return this.getEnumString(HabitatEnumToString, this.habitat!);
    }

    get seasonName(): string {
        return this.getEnumString(SeasonEnumToString, this.season!);
    }
}

export const ClassEnumToString: Record<ClassEnum, string> = {
    [ClassEnum.poisonous]: "Poisonous",
    [ClassEnum.edible]: "Edible",
};

export const CapShapeEnumToString: Record<CapShapeEnum, string> = {
    [CapShapeEnum.bell]: "Bell",
    [CapShapeEnum.conical]: "Conical",
    [CapShapeEnum.convex]: "Convex",
    [CapShapeEnum.flat]: "Flat",
    [CapShapeEnum.sunken]: "Sunken",
    [CapShapeEnum.spherical]: "Spherical",
    [CapShapeEnum.others]: "Others",
};

export const CapSurfaceEnumToString: Record<CapSurfaceEnum, string> = {
    [CapSurfaceEnum.fibrous]: "Fibrous",
    [CapSurfaceEnum.grooves]: "Grooves",
    [CapSurfaceEnum.scaly]: "Scaly",
    [CapSurfaceEnum.smooth]: "Smooth",
    [CapSurfaceEnum.shiny]: "Shiny",
    [CapSurfaceEnum.leathery]: "Leathery",
    [CapSurfaceEnum.silky]: "Silky",
    [CapSurfaceEnum.sticky]: "Sticky",
    [CapSurfaceEnum.wrinkled]: "Wrinkled",
    [CapSurfaceEnum.fleshy]: "Fleshy",
};

export const CapColorEnumToString: Record<CapColorEnum, string> = {
    [CapColorEnum.brown]: "Brown",
    [CapColorEnum.buff]: "Buff",
    [CapColorEnum.gray]: "Gray",
    [CapColorEnum.green]: "Green",
    [CapColorEnum.pink]: "Pink",
    [CapColorEnum.purple]: "Purple",
    [CapColorEnum.red]: "Red",
    [CapColorEnum.white]: "White",
    [CapColorEnum.yellow]: "Yellow",
    [CapColorEnum.blue]: "Blue",
    [CapColorEnum.orange]: "Orange",
    [CapColorEnum.black]: "Black",
};

export const DoesBruiseBleedEnumToString: Record<DoesBruiseBleedEnum, string> = {
    [DoesBruiseBleedEnum.bruises_or_bleeding]: "Bruises or Bleeding",
    [DoesBruiseBleedEnum.no]: "No",
};

export const HasRingEnumToString: Record<HasRingEnum, string> = {
    [HasRingEnum.yes]: "Yes",
    [HasRingEnum.no]: "No",
};

export const GillAttachmentEnumToString: Record<GillAttachmentEnum, string> = {
    [GillAttachmentEnum.adnate]: "Adnate",
    [GillAttachmentEnum.adnexed]: "Adnexed",
    [GillAttachmentEnum.decurrent]: "Decurrent",
    [GillAttachmentEnum.free]: "Free",
    [GillAttachmentEnum.sinuate]: "Sinuate",
    [GillAttachmentEnum.pores]: "Pores",
    [GillAttachmentEnum.none]: "None",
    [GillAttachmentEnum.unknown]: "Unknown",
};

export const GillSpacingEnumToString: Record<GillSpacingEnum, string> = {
    [GillSpacingEnum.close]: "Close",
    [GillSpacingEnum.distant]: "Distant",
    [GillSpacingEnum.none]: "None",
};

export const StemRootEnumToString: Record<StemRootEnum, string> = {
    [StemRootEnum.bulbous]: "Bulbous",
    [StemRootEnum.swollen]: "Swollen",
    [StemRootEnum.club]: "Club",
    [StemRootEnum.cup]: "Cup",
    [StemRootEnum.equal]: "Equal",
    [StemRootEnum.rhizomorphs]: "Rhizomorphs",
    [StemRootEnum.rooted]: "Rooted",
};

export const VeilTypeEnumToString: Record<VeilTypeEnum, string> = {
    [VeilTypeEnum.partial]: "Partial",
    [VeilTypeEnum.universal]: "Universal",
};

export const RingTypeEnumToString: Record<RingTypeEnum, string> = {
    [RingTypeEnum.cobwebby]: "Cobwebby",
    [RingTypeEnum.evanescent]: "Evanescent",
    [RingTypeEnum.flaring]: "Flaring",
    [RingTypeEnum.grooved]: "Grooved",
    [RingTypeEnum.large]: "Large",
    [RingTypeEnum.pendant]: "Pendant",
    [RingTypeEnum.sheathing]: "Sheathing",
    [RingTypeEnum.zone]: "Zone",
    [RingTypeEnum.scaly]: "Scaly",
    [RingTypeEnum.movable]: "Movable",
    [RingTypeEnum.none]: "None",
    [RingTypeEnum.unknown]: "Unknown",
};

export const HabitatEnumToString: Record<HabitatEnum, string> = {
    [HabitatEnum.grasses]: "Grasses",
    [HabitatEnum.leaves]: "Leaves",
    [HabitatEnum.meadows]: "Meadows",
    [HabitatEnum.paths]: "Paths",
    [HabitatEnum.heaths]: "Heaths",
    [HabitatEnum.urban]: "Urban",
    [HabitatEnum.waste]: "Waste",
    [HabitatEnum.woods]: "Woods",
};

export const SeasonEnumToString: Record<SeasonEnum, string> = {
    [SeasonEnum.spring]: "Spring",
    [SeasonEnum.summer]: "Summer",
    [SeasonEnum.autumn]: "Autumn",
    [SeasonEnum.winter]: "Winter",
};

export default Mushroom;