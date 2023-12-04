import type { PluginCreator } from 'postcss';
import { DirectionFlow } from './lib/types';
import { transformAxes } from './lib/transform-axes';

/** postcss-logical-overflow plugin options */
export type pluginOptions = {
	/** Sets the direction for inline. default: left-to-right */
	inlineDirection?: DirectionFlow,
};

const creator: PluginCreator<pluginOptions> = (opts?: pluginOptions) => {
	const options = Object.assign(
		// Default options
		{
			inlineDirection: DirectionFlow.LeftToRight,
		},
		// Provided options
		opts,
	);

	switch (options.inlineDirection) {
		case DirectionFlow.LeftToRight:
		case DirectionFlow.RightToLeft:
		case DirectionFlow.TopToBottom:
		case DirectionFlow.BottomToTop:
			break;
		default:
			throw new Error(`[postcss-logical-viewport-units] "inlineDirection" must be one of ${Object.values(DirectionFlow).join(', ')}`);
	}

	const isHorizontal = [DirectionFlow.LeftToRight, DirectionFlow.RightToLeft].includes(options.inlineDirection);

	return {
		postcssPlugin: 'postcss-logical-overflow',
		Declaration: {
			'overflow-block': (decl) => transformAxes(decl, isHorizontal),
			'overflow-inline': (decl) => transformAxes(decl, isHorizontal),
		},
	};
};

creator.postcss = true;

export default creator;
