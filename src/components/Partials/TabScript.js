import { useEffect } from "react";
import jQuery from "jquery";

const TabScript = () => {

    function de_size() {
        var w;
        jQuery('.nft__item_wrap').each(function () {
            w = jQuery(this).css('width');
            jQuery(this).css('height', w);
        });

        jQuery("img.nft__item_preview").one("load", function () {

            jQuery(this).parent().find(".d-placeholder").hide();
            jQuery(this).show();
            var width = jQuery(this).width(); //jQuery width method
            var height = jQuery(this).height(); //jQuery height method

            if (width < height) {
                jQuery(this).addClass('portrait');
                jQuery(this).parent().addClass('portrait');
            }
        });

        jQuery("img.nft__item_preview").on("load", function () {
        }).each(function () {
            if (this.complete) {

                jQuery(this).parent().find(".d-placeholder").hide();
                jQuery(this).show();
                var width = jQuery(this).width(); //jQuery width method
                var height = jQuery(this).height(); //jQuery height method

                if (width < height) {
                    jQuery(this).addClass('portrait');
                    jQuery(this).parent().addClass('portrait');
                }

            }
        });
    }

    function custom_elements() {
        console.log("Tab Content Function Is Running");
        // --------------------------------------------------
        // tabs
        // --------------------------------------------------
        jQuery('.de_tab').find('.de_tab_content > div').hide();
        jQuery('.de_tab').find('.de_tab_content > div:first').show();
        jQuery('li').find('.v-border').fadeTo(150, 0);
        jQuery('li.active').find('.v-border').fadeTo(150, 1);
        jQuery('.de_nav li').on("click", function () {
            jQuery(this).parent().find('li').removeClass("active");
            jQuery(this).addClass("active");
            jQuery(this).parent().parent().find('.v-border').fadeTo(150, 0);
            var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
            jQuery(this).parent().parent().find('.de_tab_content > div:eq(' + indexer + ')').fadeIn(); //uses whatever index the link has to open the corresponding box 
            jQuery(this).find('.v-border').fadeTo(150, 1);
        });
        // request quote function
       
        // --------------------------------------------------
        // tabs
        // --------------------------------------------------
        jQuery('.de_review').find('.de_tab_content > div').hide();
        jQuery('.de_review').find('.de_tab_content > div:first').show();
        //jQuery('.de_review').find('.de_nav li').fadeTo(150,.5);
        jQuery('.de_review').find('.de_nav li:first').fadeTo(150, 1);
        jQuery('.de_nav li').on("click", function () {
            de_size();
            jQuery(this).parent().find('li').removeClass("active");
            //jQuery(this).parent().find('li').fadeTo(150,.5);
            jQuery(this).addClass("active");
            jQuery(this).fadeTo(150, 1);
            jQuery(this).parent().parent().find('.de_tab_content > div').hide();
            var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
            jQuery(this).parent().parent().find('.de_tab_content > div:eq(' + indexer + ')').show(); //uses whatever index the link has to open the corresponding box 
        });
        // --------------------------------------------------
        // toggle
        // --------------------------------------------------
        jQuery(".toggle-list h2").addClass("acc_active");
        jQuery(".toggle-list h2").toggle(function () {
            jQuery(this).addClass("acc_noactive");
            jQuery(this).next(".ac-content").slideToggle(200);
        }, function () {
            jQuery(this).removeClass("acc_noactive").addClass("acc_active");
            jQuery(this).next(".ac-content").slideToggle(200);
        })
        // --------------------------------------------------
        // toggle
        // --------------------------------------------------
        jQuery(".expand-custom .toggle").click(function () {
            jQuery(this).stop().toggleClass("clicked");
            jQuery(this).stop().parent().parent().parent().find(".details").slideToggle(500);
        })
    }

    useEffect(() => {
        custom_elements();
    }, [])

}

export default TabScript;