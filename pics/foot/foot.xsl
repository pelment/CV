<xsl:template match="b:foot">
 <ul class="foot">
  <xsl:apply-templates/>
 </ul>
</xsl:template>

<xsl:template match="b:foot/e:text">
 <li class="text">
  <xsl:apply-templates/>
 </li>
</xsl:template>