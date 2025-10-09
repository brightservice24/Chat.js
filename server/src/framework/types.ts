import type { z } from "zod";

/**
 * Widget definition type
 * Core type used when defining widgets
 */
export type WidgetDefinition<TSchema extends z.ZodType = z.ZodType> = {
  /** 
   * Component name - maps to src/components/{component}/
   * Also used as tool ID and asset filename
   */
  component: string;
  
  /** Display name of the widget */
  title: string;
  
  /** Widget description (optional) */
  description?: string;
  
  /** 
   * JavaScript file URL for the widget
   * If omitted, automatically generated as: {frontendUrl}/{component}-{hash}.js
   */
  htmlSrc?: string;
  
  /** 
   * CSS file URL for the widget (optional)
   * If omitted, automatically generated as: {frontendUrl}/{component}-{hash}.css
   */
  cssSrc?: string;
  
  /** 
   * Root element ID where the widget will be rendered
   * If omitted, automatically generated as: {component}-root
   */
  rootElement?: string;
  
  /** Input parameter schema (Zod schema) */
  schema: TSchema;
  
  /** Handler function executed when widget is called */
  handler: (args: z.infer<TSchema>) => Promise<WidgetHandlerResult>;
  
  /** Additional metadata (optional) */
  meta?: {
    /** Message shown while widget is loading */
    invoking?: string;
    /** Message shown when widget is loaded */
    invoked?: string;
    /** Widget description - helps model understand widget's role */
    widgetDescription?: string;
  };
};

/**
 * Result type returned by widget handlers
 */
export type WidgetHandlerResult = {
  /** Text response shown to user */
  text: string;
  
  /** Structured data (optional) */
  data?: Record<string, any>;
};

/**
 * MCP widget server configuration
 */
export type ServerConfig = {
  /** Server name */
  name: string;
  
  /** Server version (used to generate asset hash) */
  version: string;
  
  /** Widget definitions array */
  widgets: WidgetDefinition[];
  
  /** HTTP server port (default: 8000) */
  port?: number;
  
  /** SSE endpoint path (default: "/mcp") */
  ssePath?: string;
  
  /** POST message endpoint path (default: "/mcp/messages") */
  postPath?: string;
  
  /**
   * Frontend server URL where widget assets are served
   * Default: "http://localhost:4444"
   */
  frontendUrl?: string;
};

/**
 * Internal widget metadata
 */
export type WidgetMeta = {
  component: string;
  title: string;
  templateUri: string;
  html: string;
  definition: WidgetDefinition;
};

