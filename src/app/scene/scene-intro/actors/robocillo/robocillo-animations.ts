export enum RobocilloAnimations {
    STOP_SIDE = 'stop_side',
    PAPER_TAKE = 'paper_take',
    PAPER_CHECK = 'paper_check',
    PAPER_THROW = 'paper_throw',
    SIDE_TO_FRONT = 'side_to_front',
    FRONT_TO_SIDE = 'front_to_side',
    STOP_FRONT = 'stop_front',
    WALK = 'walk',
    MOVE_HANDS = 'move_hands',
    RAISE_HANDS = 'raise_hands',
    JUMP_FRONT = 'jump_front',
}

export const RobocilloKeyframes = {
    walk: {
        floor_contact: [56, 60],
    },
};
