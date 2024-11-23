import enum


# Enums from mushrooms attributes. Some will be reused when identical values are valid.

class ClassEnum(enum.Enum):
    poisonous = "p"
    edible = "e"


class CapShapeEnum(enum.Enum):
    bell = "b"
    conical = "c"
    convex = "x"
    flat = "f"
    sunken = "s"
    spherical = "p"
    others = "o"


class CapSurfaceEnum(enum.Enum):
    fibrous = "i"
    grooves = "g"
    scaly = "y"
    smooth = "s"
    shiny = "h"
    leathery = "l"
    silky = "k"
    sticky = "t"
    wrinkled = "w"
    fleshy = "e"


class CapColorEnum(enum.Enum):
    brown = "n"
    buff = "b"
    gray = "g"
    green = "r"
    pink = "p"
    purple = "u"
    red = "e"
    white = "w"
    yellow = "y"
    blue = "l"
    orange = "o"
    black = "k"


class DoesBruiseBleedEnum(enum.Enum):
    bruises_or_bleeding = "t"
    no = "f"


class GillAttachmentEnum(enum.Enum):
    adnate = "a"
    adnexed = "x"
    decurrent = "d"
    free = "e"
    sinuate = "s"
    pores = "p"
    none = "f"
    unknown = "?"


class GillSpacingEnum(enum.Enum):
    close = "c"
    distant = "d"
    none = "f"


class StemRootEnum(enum.Enum):
    bulbous = "b"
    swollen = "s"
    club = "c"
    cup = "u"
    equal = "e"
    rhizomorphs = "z"
    rooted = "r"


class VeilTypeEnum(enum.Enum):
    partial = "p"
    universal = "u"


class RingTypeEnum(enum.Enum):
    cobwebby = "c"
    evanescent = "e"
    flaring = "r"
    grooved = "g"
    large = "l"
    pendant = "p"
    sheathing = "s"
    zone = "z"
    scaly = "y"
    movable = "m"
    none = "f"
    unknown = "?"


class HabitatEnum(enum.Enum):
    grasses = "g"
    leaves = "l"
    meadows = "m"
    paths = "p"
    heaths = "h"
    urban = "u"
    waste = "w"
    woods = "d"


class SeasonEnum(enum.Enum):
    spring = "s"
    summer = "u"
    autumn = "a"
    winter = "w"
